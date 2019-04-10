import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { hierarchy, HierarchyRectangularNode, partition } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import { transition } from 'd3-transition';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ContrastService, FocusIndicatorOriginService } from '../../directives/accessibility/index';
import { ResizeService } from '../../directives/resize/index';
import { ColorService, ThemeColor } from '../../services/color/index';

@Component({
    selector: 'ux-partition-map',
    templateUrl: './partition-map.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartitionMapComponent implements OnInit, OnDestroy {

    /** Define the colors to be used for each row and the order they should appear. */
    @Input() set colors(colors: (string | ThemeColor)[][]) {
        this._colors = colors;

        // clear the save color mappings
        this._segmentColors.clear();
    }

    /** Determine the percentage height of collapsed segments. */
    @Input() collapsedHeight: number = 5;

    /** Define a minimum desired percentage width for a segment. */
    @Input() minSegmentWidth: number = 1;

    /** Define the dataset to display in the chart. */
    @Input() set dataset(dataset: Readonly<PartitionMapSegment>) {

        // store the current dataset
        this._dataset = dataset;

        // clear any existing color assignments
        this._segmentColors.clear();

        // update the segment layout
        this.setDataset(dataset);
    }

    get dataset(): Readonly<PartitionMapSegment> {
        return this._dataset;
    }

    /** Define the currently selected item. */
    @Input() set selected(selected: PartitionMapSegment) {

        // if this is set before the dataset is process then store it to be selected later
        if (this._segments.length === 0) {
            this._awaitingSelection = selected;
            return;
        }

        // perform the selection
        this.select(this.getHierarchyNodeFromSegment(selected));
    }

    /** Define the function that will return the aria announcement for a given segment. */
    @Input() segementAnnouncement: (info: PartitionMapSegmentAnnouncementInfo) => string = this.defaultSegmentAnnouncement;

    /** Emits whenever a segment is selected. */
    @Output() selectedChange = new EventEmitter<PartitionMapSegment>();

    /** Access a if provided custom template */
    @ContentChild('partitionMapSegment') segmentTemplate: TemplateRef<PartitionMapCustomSegmentContext>;

    /** Store the processed segments */
    _segments: HierarchyRectangularNode<PartitionMapSegment>[] = [];

    /** Store the current dataset */
    private _dataset: Readonly<PartitionMapSegment>;

    /** Store the specified color sequences */
    private _colors: (string | ThemeColor)[][] = [[]];

    /** Store the currently selected segment */
    private _selected: HierarchyRectangularNode<PartitionMapSegment>;

    /** Store the assigned colors for each segment */
    private _segmentColors = new Map<string, string>();

    /** Store the visible x scale */
    private _x = scaleLinear().range([0, 100]);

    /** Store the visible y scale */
    private _y = scaleLinear().range([0, 100]);

    /** Store the visible d3 segments */
    private _segmentsSelection: Selection<HTMLDivElement, HierarchyRectangularNode<PartitionMapSegment>, HTMLElement, {}>;

    /** Store the current focusable segment */
    private _focusableSegment: HierarchyRectangularNode<PartitionMapSegment>;

    /** Store an item awaiting selection */
    private _awaitingSelection: PartitionMapSegment;

    /** Store the width of the chart on resize to avoid any reflow */
    private _width: number = this._elementRef.nativeElement.offsetWidth;

    /** Unsubscribe from any observables on destroy */
    private _onDestroy = new Subject<void>();

    constructor(
        private _colorService: ColorService,
        private _elementRef: ElementRef,
        private _changeDetector: ChangeDetectorRef,
        private _ngZone: NgZone,
        private _focusOrigin: FocusIndicatorOriginService,
        private _contrastRatio: ContrastService,
        private _liveAnnouncer: LiveAnnouncer,
        private _resizeService: ResizeService
    ) { }

    ngOnInit(): void {
        this._resizeService.addResizeListener(this._elementRef.nativeElement).pipe(takeUntil(this._onDestroy)).subscribe(dimensions => {
            this._width = dimensions.width;
            this._changeDetector.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Handle segment clicks */
    _onSegmentSelect(segment: HierarchyRectangularNode<PartitionMapSegment>): void {
        // if the clicked node is already selected, navigate to the parent node
        this.select(this._isSelected(segment) && segment.parent ? segment.parent : segment);
    }

    /** Get the background color for a given segment */
    _getBackgroundColor(segment: HierarchyRectangularNode<PartitionMapSegment>): string {

        // each segment has a determinable color key based on the name and depth
        const key = `${segment.data.name} - ${segment.depth}`;

        // check if a segment with the same name (and depth) has previously
        if (this._segmentColors.has(key)) {
            return this._segmentColors.get(key);
        }

        // get the corresponding row of colors
        const sequence = this.getColorSequence(segment.depth);

        // if the sequence has not been specified return a default of white
        if (!sequence || sequence.length === 0) {
            return '#fff';
        }

        // get siblings
        const siblings = this.getAllSiblings(segment);

        // get the previous sibling if there is one
        const sibling = siblings[siblings.indexOf(segment) - 1];

        // if there is a previous sibling then get its color and use the next one in the sequence
        if (sibling) {
            const index = sequence.indexOf(this._getBackgroundColor(sibling));
            const color = sequence[(index + 1) % sequence.length];

            // store the color by key
            this._segmentColors.set(key, color);

            return color;
        }

        // store the color by key
        this._segmentColors.set(key, sequence[0]);

        // if there is no previous sibling then simply return the first color in the sequence
        return sequence[0];
    }

    /** Get the tab index of a segment */
    _getTabIndex(segment: HierarchyRectangularNode<PartitionMapSegment>): number {
        return segment === this._focusableSegment ? 0 : -1;
    }

    /** Shift focus to the parent segment */
    _focusParent(segment: HierarchyRectangularNode<PartitionMapSegment>): void {

        // if there is no parent (ie, we are the root segment) then retain focus
        if (!segment.parent) {
            return;
        }

        // otherwise focus the parent
        this.focusSegment(segment.parent);
    }

    /** Shift focus to the child segment */
    _focusChild(segment: HierarchyRectangularNode<PartitionMapSegment>): void {

        // if there are no children (ie, we are a leaf segment) then retain focus
        if (!segment.children) {
            return;
        }

        // find the first visible child
        const child = segment.children.find(_segment => this.isVisible(_segment));

        // otherwise focus the first visible child
        if (child) {
            this.focusSegment(child);
        }
    }

    /** Shift focus to the sibling segment */
    _focusSibling(segment: HierarchyRectangularNode<PartitionMapSegment>, delta: number): void {

        // if we are the root node then do nothing
        if (!segment.parent) {
            return;
        }

        // get a list of all the siblings (at the same row regardless of the same parent)
        const siblings = this.getAllSiblings(segment);

        // get the index of the segment in the list of siblings
        const index = siblings.indexOf(segment);

        // get the target sibling
        const sibling = siblings[index + delta];

        // ensure the sibling is visible otherwise we can't select it
        if (!sibling || !this.isVisible(sibling)) {
            return;
        }

        // otherwise focus the sibling
        this.focusSegment(sibling);
    }

    _focusFirstSibling(segment: HierarchyRectangularNode<PartitionMapSegment>): void {
        // if we are the root node then do nothing
        if (!segment.parent) {
            return;
        }

        // get a list of all the siblings (at the same row regardless of the same parent)
        const siblings = this.getAllSiblings(segment);

        // find the first visible sibling
        const sibling = siblings.find(_sibling => this.isVisible(_sibling));

        // ensure there is a sibling
        if (!sibling) {
            return;
        }

        // otherwise focus the sibling
        this.focusSegment(sibling);
    }

    _focusLastSibling(segment: HierarchyRectangularNode<PartitionMapSegment>): void {
        // if we are the root node then do nothing
        if (!segment.parent) {
            return;
        }

        // get a list of all the siblings (at the same row regardless of the same parent)
        const siblings = this.getAllSiblings(segment);

        // find the last visible sibling
        const sibling = siblings.reverse().find(_sibling => this.isVisible(_sibling));

        // ensure there is a sibling
        if (!sibling) {
            return;
        }

        // otherwise focus the sibling
        this.focusSegment(sibling);
    }

    /** Determine if a given segment is currently collapsed */
    _isCollapsed(segment: HierarchyRectangularNode<PartitionMapSegment>): boolean {
        return this._selected && segment.depth < this._selected.depth;
    }

    /** Determine if a given segment is currently selected */
    _isSelected(segment: HierarchyRectangularNode<PartitionMapSegment>): boolean {
        return this._selected === segment;
    }

    /** Get the contast color class for the segment */
    _getContrastColor(segment: HierarchyRectangularNode<PartitionMapSegment>): string {
        const backgroundColor = this._getBackgroundColor(segment);
        const lightColor = ThemeColor.parse('#fff');
        const darkColor = ThemeColor.parse('#000');
        const color = this._contrastRatio.getContrastColor(ThemeColor.parse(backgroundColor), lightColor, darkColor);

        return color === lightColor ? 'partition-map-segment-light' : 'partition-map-segment-dark';
    }

    /** Provide an aria announcement when the node is focused */
    _onFocus(segment: HierarchyRectangularNode<PartitionMapSegment>): void {
        // get all ancestors
        const ancestors = segment.ancestors().map(ancestor => ancestor.data);

        // get the current node and the parent nodes
        const [item, ...parents] = ancestors;

        // get the hierarchy node data from the item
        const hierarchichalItem = this.getHierarchyNodeFromSegment(item);

        // get the function that creates the announcement
        const announcement = this.segementAnnouncement({
            item,
            parents,
            value: this._getSegmentValue(segment.data),
            collapsed: this._isCollapsed(hierarchichalItem),
            selected: this._isSelected(hierarchichalItem)
        });

        // make aria announcement
        this._liveAnnouncer.announce(announcement);
    }

    /** Determine if the content is smaller than the width of an ellipsis */
    _getSegmentContentHidden(segment: HierarchyRectangularNode<PartitionMapSegment>): boolean {
        // get the width of the segment as a pixel value
        const width = (this._width / 100) * this.getNormalizedSegmentWidth(segment);

        // if the width is less than 50 px hide the content
        return width < 50;
    }

    /** Get the value of a segment based on the accumulation of all child values */
    _getSegmentValue(segment: PartitionMapSegment): number {

        // it it has a value then return the value
        if (segment.hasOwnProperty('value')) {
            return (segment as PartitionMapSegmentWithValue).value;
        }

        return (segment as PartitionMapSegmentWithChildren).children.reduce((value, child) => value + this._getSegmentValue(child), 0);
    }

    /** Convert the public facing data structure into the layout format we require */
    private setDataset(dataset: Readonly<PartitionMapSegment>): void {

        // convert the segments to a hierarchichal structure
        const segmentHierarchy = hierarchy(dataset)
            .sum(this.getSegmentValue); // calculate segment values based on their children

        // store the processed segments
        const root = partition()(segmentHierarchy) as HierarchyRectangularNode<PartitionMapSegment>;

        // store the flattened form of the segments
        this._segments = root.descendants();

        // mark the root node as focusable
        this._focusableSegment = root;

        // we need to run change detection here so the `*ngFor` will update and add all the segments to the DOM
        this._changeDetector.detectChanges();

        // select all the segments within the chart
        this._segmentsSelection = select(this._elementRef.nativeElement)
            .selectAll('.partition-map-segment')
            .data(this._segments)
            .style('left', data => this.getNormalizedSegmentX(data) + '%')
            .style('top', data => this.getNormalizedSegmentY(data) + '%')
            .style('width', data => (this.getNormalizedSegmentWidth(data) + 0.01) + '%')
            .style('height', data => this.getNormalizedSegmentHeight(data) + '%')
            .style('padding-right', data => this.getSegmentPaddingRight(data) + '%')
            .style('padding-left', data => this.getSegmentPaddingLeft(data) + '%') as Selection<HTMLDivElement, HierarchyRectangularNode<PartitionMapSegment>, HTMLElement, {}>;

        // if there is an item waiting to be selected then select it
        if (this._awaitingSelection) {

            // select the desired segment
            this.select(this.getHierarchyNodeFromSegment(this._awaitingSelection));

            // clear the pending selection in case the dataset changes we don't want to attempt another selection
            this._awaitingSelection = null;
        }
    }

    /**
     * Get the X position of a given segment. The X position can be determined
     * by calculating the width of every sibling segment to the left of it
     */
    private getSegmentX(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // if root node then return the position
        if (!segment.parent) {
            return segment.x0;
        }

        // set initial start position equal to that of the parent
        let accumulation = this.getSegmentX(segment.parent);

        // iterate each previous sibling to accumulate the widths
        for (const sibling of segment.parent.children) {

            // if we have reached the current node then return all previous widths
            if (sibling === segment) {
                return accumulation;
            }

            // keep a tally of all the widths of previous siblings
            accumulation += this.getSegmentWidth(sibling);
        }
    }

    /** Calculate width based of each segment */
    private getSegmentWidth(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // if root node then return 1 always
        if (!segment.parent) {
            return 1;
        }

        // get width of parent
        const parentOffset = this.getSegmentWidth(segment.parent) / (segment.parent.x1 - segment.parent.x0);

        // get the original width of the segment
        const width = (segment.x1 - segment.x0);

        // if the item is a descendant of the selected item then apply the modifier
        if (this.isDescendantOfSelected(segment)) {

            // we want to try an ensure that children are at least the specified minimum width
            // however it may not always be possible, but we should be able to at least distribute the widths better
            // even if we cannot meet the minimum desired width.
            const modifier = this.getDistributionModifier(segment);

            // return the width of the current node relative to the parent
            return (width * modifier) * parentOffset;
        }

        return width * parentOffset;
    }

    /** Return the X position of the segment in a normalized form based on the specifiec domain */
    private getNormalizedSegmentX(segment: HierarchyRectangularNode<PartitionMapSegment>): number {
        return this._x(this.getSegmentX(segment));
    }

    /** Return the Y position of the segment in a normalized form based on the specifiec domain */
    private getNormalizedSegmentY(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // if there is a selected node we should take into account any collapsed nodes
        if (this._isCollapsed(segment)) {
            return segment.depth * this.collapsedHeight;
        }

        // otherwise simply return the normalized value
        return this._y(segment.y0);
    }

    /** Return the width of the segment in a normalized form based on the specifiec domain */
    private getNormalizedSegmentWidth(segment: HierarchyRectangularNode<PartitionMapSegment>): number {
        return this._x(this.getSegmentX(segment) + this.getSegmentWidth(segment)) - this._x(this.getSegmentX(segment));
    }

    /** Return the height of the segment in a normalized form based on the specifiec domain */
    private getNormalizedSegmentHeight(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // if there is a selected node we should take into account any collapsed nodes
        if (this._isCollapsed(segment)) {
            return this.collapsedHeight;
        }

        // otherwise simply return the normalized value
        return this._y(segment.y0 + (segment.y1 - segment.y0)) - this._y(segment.y0);
    }

    /**
     * As parent segments collapse they increase in size, as the content is centered this can
     * cause the content to appear either mis-aligned or off screen. We can calculate the padding
     * required to always ensure the content appears visibly centered within the node.
     */
    private getSegmentPaddingRight(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // non-collapsed node do not require any padding
        if (!this._isCollapsed(segment)) {
            return 0;
        }

        return (this.getNormalizedSegmentWidth(segment) - this.getSegmentPaddingLeft(segment)) - this.getNormalizedSegmentWidth(this._selected);
    }

    private getSegmentPaddingLeft(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // non-collapsed node do not require any padding
        if (!this._isCollapsed(segment)) {
            return 0;
        }

        return Math.abs(this.getNormalizedSegmentX(segment));
    }

    /**
     * This function returns the value for each segment. Leaf segments will have a value property which we can simply return, however
     * non-leaf segments should get their values based on the leaf segments that are children, in which case we can return 0
     */
    private getSegmentValue(segment: PartitionMapSegment): number {
        if (segment.hasOwnProperty('value')) {
            const value = (segment as PartitionMapSegmentWithValue).value;

            // we must ensure that a leaf node never has no width otherwise things can get weird
            return Math.max(value, 1);
        }

        // if it has children then return 0 to base the value of the width of the children
        return 0;
    }

    /** Get the total height of all the collapse rows */
    private getCollapsedHeight(): number {
        return this._selected ? this._selected.depth * this.collapsedHeight : 0;
    }

    /** Determine if a given segment is currently visible based on the selected segment */
    private isVisible(segment: HierarchyRectangularNode<PartitionMapSegment>): boolean {

        // if no segment is selected then all segments are visible
        if (!this._selected) {
            return true;
        }

        // if there is a selected node then it should be a direct ancestor or descendant to be visible
        return !![...this._selected.ancestors(), ...this._selected.descendants()].find(_segment => _segment === segment);
    }

    /** Update the focusable item and perform a focus */
    private focusSegment(segment: HierarchyRectangularNode<PartitionMapSegment>): void {

        // get the segment element from the data
        const element = this._segmentsSelection.nodes().find(node => select(node).data()[0] === segment);

        // if for some reason an element isn't found then stop here
        if (!element) {
            return;
        }

        // update the focusable segment
        this._focusableSegment = segment;

        // set the focus origin as a keyboard event
        this._focusOrigin.setOrigin('keyboard');

        // focus the element
        element.focus();

        // ensure we do not change scroll position when focusing
        (this._elementRef.nativeElement as HTMLElement).scrollLeft = 0;
        (this._elementRef.nativeElement as HTMLElement).scrollTop = 0;
    }

    /** Get all the segments at a given depth */
    private getAllSiblings(segment: HierarchyRectangularNode<PartitionMapSegment>): HierarchyRectangularNode<PartitionMapSegment>[] {
        return this._segments.filter(_segment => _segment.depth === segment.depth);
    }

    private getHierarchyNodeFromSegment(segment: PartitionMapSegment): HierarchyRectangularNode<PartitionMapSegment> | null {
        return this._segments.find(_segment => _segment.data === segment);
    }

    /** Select a specified segment */
    private select(segment: HierarchyRectangularNode<PartitionMapSegment>): void {

        // if no segment is specified or it is already selected then do nothing
        if (!segment || this._isSelected(segment)) {
            return;
        }

        // emit the selection
        this.selectedChange.emit(segment.data);

        // store the selected segment
        this._selected = segment;

        // update the focusable segment
        this._focusableSegment = segment;

        // set our new ranges
        this._x.domain([this.getSegmentX(segment), this.getSegmentX(segment) + this.getSegmentWidth(segment)]);
        this._y.domain([segment.y0, 1]).range([this.getCollapsedHeight(), 100]);

        // create the transition
        const segmentTransition = transition().duration(500);

        // update the segment sizes - outside angular zone as there is lots of `requestAnimationFrames` triggering lots of change detection
        this._ngZone.runOutsideAngular(() => {
            this._segmentsSelection.transition(segmentTransition)
                .style('left', data => this.getNormalizedSegmentX(data) + '%')
                .style('top', data => this.getNormalizedSegmentY(data) + '%')
                .style('width', data => (this.getNormalizedSegmentWidth(data) + 0.01) + '%')
                .style('height', data => this.getNormalizedSegmentHeight(data) + '%')
                .style('padding-right', data => this.getSegmentPaddingRight(data) + '%')
                .style('padding-left', data => this.getSegmentPaddingLeft(data) + '%');
        });
    }

    /** Normalize the available colors to a string[][] from portentially a ThemeColor[][] */
    private getColorSequence(depth: number): string[] {
        // get the target row
        const colorSet = this._colors[depth];

        // if no color set available throw an error
        if (!colorSet) {
            throw new Error('Partition Map: Please provide a color sequence for items with a depth of ' + depth);
        }

        // convert this row to an array of strings
        return colorSet.map(color => ThemeColor.isInstanceOf(color) ? (color as ThemeColor).toRgba() : this._colorService.resolve(color as string));
    }

    /** Determine if a segment is a descendant of the currently selected item */
    private isDescendantOfSelected(segment: HierarchyRectangularNode<PartitionMapSegment>): boolean {

        // if there are no segments selected then return true
        if (!this._selected) {
            return true;
        }

        // if the segment is the selected segment then it is not a descendant
        if (this._selected === segment) {
            return false;
        }

        return !!this._selected.descendants().find(_segment => _segment === segment);
    }

    /**
     * We have an option to allow a minimum desired width for items. This will
     * allow us to attempt to determine the size a segment would be accounting for very
     * small segments that have their widths artifically increased to make them more visible
     */
    private getDistributionModifier(segment: HierarchyRectangularNode<PartitionMapSegment>): number {

        // map to a segment width pair
        const siblings = segment.parent.children.map(_segment => {
            return { segment: _segment, width: this._x(_segment.x1 - _segment.x0) };
        });

        // a simple closure to check if we now have acceptable sizes
        const isAcceptable = (segments: { segment: HierarchyRectangularNode<PartitionMapSegment>, width: number }[]) =>
            !segments.find(_segment => _segment.width < this.minSegmentWidth) ||
            segments.filter(_segment => _segment.width < this.minSegmentWidth).length === siblings.length;

        // if all segments are above or below the desired width then we can stop here
        if (isAcceptable(siblings)) {
            return 1;
        }

        // find the total amount we need to reclaim for other segments
        let amountToReclaim = siblings.reduce((accumulation, _segment) => accumulation + (_segment.width < this.minSegmentWidth ? this.minSegmentWidth - _segment.width : 0), 0);

        // loop through adjusting the segments until we either make all acceptable sizes or cannot resize any further
        while (!isAcceptable(siblings) && amountToReclaim !== 0) {

            // determine which segments can shrink
            const shrinkableSiblings = siblings.filter(sibling => sibling.width > this.minSegmentWidth);

            // determine which segments need to grow
            const growableSiblings = siblings.filter(sibling => sibling.width < this.minSegmentWidth);

            // if there are no items that can be shrunk/grown then do nothing
            if (shrinkableSiblings.length === 0 || growableSiblings.length === 0) {
                break;
            }

            // determine the target amount to remove from each segment
            const shrinkTarget = amountToReclaim / shrinkableSiblings.length;

            // store the amount we have reclaimed in this pass
            let reclaimed = 0;

            // iterate each segment and subtract accordingly
            for (const sibling of shrinkableSiblings) {

                // determine how much we can actually subtract - as subtracting the target may bring the width down below the
                // minimum which we don't want, so instead determine if we can subtract the target amount, otherwise figure out
                // how much we can subtract without bringing the width below the desired minimum
                const subtractAmount = sibling.width - shrinkTarget > this.minSegmentWidth ? shrinkTarget : sibling.width - this.minSegmentWidth;

                // update the amount to reclaim with the new value
                reclaimed += subtractAmount;

                // update the sibling width
                sibling.width -= subtractAmount;
            }

            // update the amount left to reclaim
            amountToReclaim -= reclaimed;

            // determine the target amount to add to each segment
            const growTarget = reclaimed / growableSiblings.length;

            // add the available reclaimed amount to the segment that need to grow
            for (const sibling of growableSiblings) {

                // determine the amount we need to add. The target amount may be larger than the amount we need
                // to add so ensure we only add the amount we need and no more.
                const addAmount = sibling.width + growTarget < this.minSegmentWidth ? growTarget : this.minSegmentWidth - sibling.width;

                // update the sibling width
                sibling.width += addAmount;
            }
        }

        // identify the current widget from all the siblings
        const matchingSegment = siblings.find(sibling => sibling.segment === segment);

        // check if we are the last sibling
        const isLast = siblings.findIndex(sibling => sibling.segment === segment) === siblings.length - 1;

        // if we are the last and somehow we are smaller than the parent node, we want to bump up the size of the last node
        if (isLast) {
            // get the total parent width
            const parentWidth = this._x(segment.parent.x1 - segment.parent.x0);

            // get the total width of all the children
            const width = siblings.reduce((total, sibling) => total + sibling.width, 0);

            // check if need to expand the last node
            if (parentWidth !== width) {
                return (matchingSegment.width + (parentWidth - width)) / this._x(matchingSegment.segment.x1 - matchingSegment.segment.x0);
            }
        }

        // determine the amount the size has changed
        return matchingSegment.width / this._x(matchingSegment.segment.x1 - matchingSegment.segment.x0);
    }

    /** Get the default announcement when a segment is focused */
    private defaultSegmentAnnouncement(info: PartitionMapSegmentAnnouncementInfo): string {

        // create the announcement
        if (info.parents.length === 0) {
            return `This is the root segment. It has a value of ${info.value}.`;
        }

        // otherwise inform the user of the parent hierarchy
        return `${info.item.name} has a value of ${info.value} and is a ${info.parents.map(parent => `descendant of ${parent.name}`).join(' and a ')}`;
    }

}

export interface PartitionMapSegmentBase {
    name: string;
}

export interface PartitionMapSegmentWithChildren extends PartitionMapSegmentBase {
    children: ReadonlyArray<PartitionMapSegment>;
}

export interface PartitionMapSegmentWithValue extends PartitionMapSegmentBase {
    value: number;
}

/** This union type allows us to ensure that a partition map segment has either children or a value */
export type PartitionMapSegment = PartitionMapSegmentWithChildren | PartitionMapSegmentWithValue;

/** Partition map custom segment template context */
export interface PartitionMapCustomSegmentContext {
    data: PartitionMapSegment;
}

/** An object of this interface is passed to the announcer function */
export interface PartitionMapSegmentAnnouncementInfo {
    item: PartitionMapSegment;
    value: number;
    parents: PartitionMapSegment[];
    collapsed: boolean;
    selected: boolean;
}
