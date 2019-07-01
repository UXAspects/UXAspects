import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { ResizeDimensions } from '../../directives/resize/index';
import { ColorService, ThemeColor } from '../../services/color/index';
import { SankeyLink, SankeyLinkInteraction, SankeyLinkPlot } from './interfaces/link.interface';
import { SankeyNodeLink } from './interfaces/node-link.interface';
import { SankeyNode } from './interfaces/node.interface';
import { SankeyChart } from './sankey-chart';
import { SankeyFocusManager } from './sankey-focus-manager';

@Component({
    selector: 'ux-sankey-chart',
    templateUrl: './sankey-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [SankeyFocusManager],
    animations: [
        trigger('tooltipAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(160, style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate(160, style({ opacity: 0 }))
            ])
        ])
    ],
})
export class SankeyChartComponent<T> implements OnChanges, AfterViewInit {

    /** Define the nodes to display */
    @Input() nodes: ReadonlyArray<SankeyNode<T>> = [];

    /** Define the links to display */
    @Input() links: ReadonlyArray<SankeyLink> = [];

    /** Define the headers of each column */
    @Input() columns: string[] = [];

    /** Define the minimum width of a node */
    @Input() minWidth: number = 0;

    /** Define the maximum width of a node */
    @Input() maxWidth: number = Infinity;

    /** Define the function to get the contents of a link tooltip */
    @Input() linkTooltip: (link: SankeyLink) => string = this.getLinkTooltip;

    /** Define the function to get the contents of a falloff tooltip */
    @Input() falloffTooltip: (falloff: number) => string = this.getFalloffTooltip;

    /** Define the active color of a node */
    @Input() color: string | ThemeColor;

    /** Define the template of sankey chart nodes */
    @ContentChild('sankeyNodeTemplate') nodeTemplate: TemplateRef<SankeyNodeContext<T>>;

    /** Access the SVG element which will contain the links */
    @ViewChild('linkContainer') linkContainer: ElementRef;

    /** Access the element which will contain the nodes */
    @ViewChild('nodeContainer') nodeContainer: ElementRef;

    /** Store the width of the chart area */
    _width: number;

    /** Store the height of the chart area */
    _height: number;

    /** Define the nodes that should be rendered */
    _nodes: ReadonlyArray<SankeyNodeLink<T>> = [];

    /** Define the columns to display */
    _columns: ReadonlyArray<SankeyColumn> = [];

    /** Determine if the tooltip should be visible or not */
    _isTooltipOpen: boolean = false;

    /** Define the position of the tooltip */
    _tooltipPosition: SankeyTooltipPosition = { x: 0, y: 0 };

    /** Define the content to display in the tooltip */
    _tooltipContent: string;

    /** Determine if the component is initialised */
    private _isInitialised: boolean = false;

    /** Store the instance of the sankey layout */
    private _sankey = new SankeyChart<T>();

    constructor(
        private _focusManager: SankeyFocusManager<T>,
        private _changeDetector: ChangeDetectorRef,
        private _colorService: ColorService
    ) { }

    ngAfterViewInit(): void {

        // verify we have a node template defined before proceeding
        if (!this.nodeTemplate) {
            throw new Error('Sankey Chart - Node Template has not been defined.');
        }

        // set the initial chart size
        this._width = this.nodeContainer.nativeElement.offsetWidth;
        this._height = this.nodeContainer.nativeElement.offsetHeight;

        // perform the initial render
        this._render();

        // mark the component as initialised
        this._isInitialised = true;
    }

    /**
     * Detect any changes from Inputs. We can skip
     * the first function call as this happens before
     * the initial render so it has no effect.
     */
    ngOnChanges(): void {
        if (this._isInitialised) {
            this._render();
        }
    }

    /** Re-render the chart */
    _render(): void {
        this._nodes = this._sankey
            .nodes(this.nodes)
            .links(this.links)
            .spacing(14)
            .size(this.minWidth, this.maxWidth)
            .width(this._width || this.nodeContainer.nativeElement.offsetWidth)
            .height(this._height || this.nodeContainer.nativeElement.offsetHeight)
            .layout();

        // ensure the focus manager has the latest node data
        this._focusManager.setNodes(this._nodes);

        this._columns = this.getColumns();
        this._changeDetector.detectChanges();
    }

    /** Update the layout whenever the dimensions change changes */
    _onResize(dimensions: ResizeDimensions): void {
        this._width = dimensions.width;
        this._height = dimensions.height;
        this._render();
    }

    /**
     * Column count should be based on the data, not the titles
     * as they may not specify titles but the nodes will still be
     * rendered.
     */
    _getColumnCount(): number {
        return this._nodes.reduce((column, node) => Math.max(column, node.column), 0);
    }

    /**
     * Get the SVG path that defines the shape of the link
     */
    _getPath(link: SankeyLink): string {
        return this._sankey.link(link);
    }

    /**
     * Set the active state of a node and the inputs and outputs
     * associated with this node.
     */
    _setNodeActive(nodeLink: SankeyNodeLink<T>, active: boolean): void {

        // set the node active state
        nodeLink.active = active;

        // set the active state of each link
        nodeLink.inputs.forEach(link => link.active = active);
        nodeLink.outputs.forEach(link => link.active = active);

        // set the active state of all input and output nodes
        nodeLink.inputs.map(link => this._sankey.getNodeLink(link.source)).forEach(_node => _node.active = active);
        nodeLink.inputs.map(link => this._sankey.getNodeLink(link.target)).forEach(_node => _node.active = active);
        nodeLink.outputs.map(link => this._sankey.getNodeLink(link.source)).forEach(_node => _node.active = active);
        nodeLink.outputs.map(link => this._sankey.getNodeLink(link.target)).forEach(_node => _node.active = active);

        // ensure we update the view to show highlights
        this._changeDetector.detectChanges();
    }


    /**
     * Set the focused state of a node and the inputs and outputs
     * associated with this node.
     */
    _setNodeFocus(nodeLink: SankeyNodeLink<T>, focused: boolean, element: HTMLDivElement): void {

        // set the node focus state
        nodeLink.focus = focused;

        // set the active state of each link
        nodeLink.inputs.forEach(link => link.focus = focused);
        nodeLink.outputs.forEach(link => link.focus = focused);

        // set the active state of all input and output nodes
        nodeLink.inputs.map(link => this._sankey.getNodeLink(link.source)).forEach(_node => _node.focus = focused);
        nodeLink.inputs.map(link => this._sankey.getNodeLink(link.target)).forEach(_node => _node.focus = focused);
        nodeLink.outputs.map(link => this._sankey.getNodeLink(link.source)).forEach(_node => _node.focus = focused);
        nodeLink.outputs.map(link => this._sankey.getNodeLink(link.target)).forEach(_node => _node.focus = focused);

        // we need to add the focus indicator here programmatically. The default quantum-ux-aspects focus indicator
        // styling uses `!important` so our inline style needs to also be `!important` to override this, and unfortunately
        // there is a known issue with `NgStyle` and `[style.xyz]` bindings preventing them from adding the `!important`
        // modifier so we must do it manually (not using `Renderer2`).
        if (this.color) {
            element.style.setProperty('box-shadow', this._getFocusIndicator(nodeLink), 'important');
        }

        // ensure we update the view to show highlights
        this._changeDetector.detectChanges();
    }

    /**
     * Set the active state of a link and the source and target
     * nodes associated with the link
     */
    _setLinkActive(link: SankeyLink & SankeyLinkPlot & SankeyLinkInteraction, active: boolean): void {
        link.active = active;

        if (link.source !== undefined) {
            this._sankey.getNodeLink(link.source).active = active;
        }

        if (link.target !== undefined) {
            this._sankey.getNodeLink(link.target).active = active;
        }

        // update the tooltip visibility
        this._isTooltipOpen = active;

        // update the tooltip content
        this._tooltipContent = active ? this.linkTooltip(link) : '';

        // ensure we update the view to show highlights
        this._changeDetector.detectChanges();
    }

    /**
     * This is required because we want to toggle a class based on the `active`
     * property on a link, however toggling classes using `NgClass` or the class
     * binding syntax `[class.xyz]` does not work in IE when applied to an SVG
     * element. (https://github.com/angular/angular/issues/6327)
     *
     * The alternatice is to bind directly to the `class` attribute and return a
     * string that will toggle the class based on the `active` property.
     */
    _getLinkClass(link: SankeyLink & SankeyLinkPlot & SankeyLinkInteraction): string {
        return `ux-sankey-chart-link ${(link.active || link.focus) ? 'ux-sankey-chart-link-active' : ''}`;
    }

    /**
     * Get the SVG path that defines the shape of the falloff indicator
     */
    _getFalloffPath(node: SankeyNodeLink<T>): string {
        return this._sankey.getFalloffPath(node);
    }

    /**
     * Falloff represents the amount of data that does not get passed on,
     * for example, if a node gets 1,000,000 items from inputs and only outputs
     * 500,000 then there is falloff of 500,000. However, items in the last column
     * never pass on any information, so tecnhically 100% of their input is falloff
     * so we shouldn't show it in the last column.
     */
    _showFalloff(nodeLink: SankeyNodeLink<T>): boolean {
        return nodeLink.column < this._columns.length - 1;
    }

    /** Update the visibility and content of the tooltip on falloff hover */
    _setFalloffTooltip(nodeLink: SankeyNodeLink<T>, isVisible: boolean): void {
        this._isTooltipOpen = isVisible;
        this._tooltipContent = isVisible ? this.falloffTooltip(nodeLink.falloff) : '';
        this._changeDetector.detectChanges();
    }

    /**
     * Update the position of the tooltip
     */
    _setTooltipPosition(event: MouseEvent): void {
        const { left, top } = (this.nodeContainer.nativeElement as HTMLElement).getBoundingClientRect();
        const x = (event.pageX - left) - (window.scrollX || document.documentElement.scrollLeft);
        const y = (event.pageY - top) - (window.scrollY || document.documentElement.scrollTop);

        this._tooltipPosition = { x, y };
        this._changeDetector.detectChanges();
    }

    /**
     * Correctly track the node changes in `*ngFor` based on
     * the unique node ids to prevent unnecessary re-rendering
     */
    _trackNodeBy(_index: number, nodeLink: SankeyNodeLink<T>) {
        return nodeLink.node.id;
    }

    /**
     * Correctly track the link changes in `*ngFor` based on
     * the source and target to prevent unnecessary re-rendering
     */
    _trackLinkBy(_index: number, link: SankeyLink) {
        return `${link.source}-${link.target}`;
    }

    /**
     * Get the color of node based on whether or not
     * the `color` input has been provided.
     */
    _getColor(item: SankeyNodeLink<T> | SankeyLink & SankeyLinkInteraction): string {
        // if we are not node hovering or focusing or no custom color is defined then return nothing
        if (!item.active && !item.focus || !this.color) {
            return;
        }

        // return an rgba value if it is a `ThemeColor` to support transparency
        return this.color instanceof ThemeColor ? this.color.toRgba() : this._colorService.resolve(this.color);
    }

    /**
     * We want the focus indicator color to match the active color,
     * which if programmatically defined need to be overriden
     */
    _getFocusIndicator(nodeLink: SankeyNodeLink<T>): string {
        // if the node is not focused or there is no custom color
        // then return null in which case CSS indicator will show
        if (!nodeLink.focus || !this.color) {
            return '';
        }

        // otherwise return the shadow based on the color provided.
        const color = this.color instanceof ThemeColor ? this.color : ThemeColor.parse(this._colorService.resolve(this.color));

        // generate a box shadow based on the specified color
        return `0 0 0 1px #fff, 0 0 0 3px ${color.setAlpha(0.5).toRgba()}`;
    }

    /**
     * Get columns mapped with their title if they have any
     */
    private getColumns(): SankeyColumn[] {
        return this._sankey.columns().map((width, index) => ({ width, title: this.columns[index] || '', position: this.getColumnPosition(index) }));
    }

    /**
     * Get the start position of a column which can be determined
     * by finding a node that is in that column and using its
     * x position as all nodes start at the same position within a column.
     */
    private getColumnPosition(column: number): number {
        // find a node in this column and take its x position
        const node = this._nodes.find(_node => _node.column === column);
        return node ? node.x : 0;
    }

    /**
     * Get the default content of a link tooltip
     */
    private getLinkTooltip(link: SankeyLink): string {
        return link.value.toLocaleString('en') + ' items';
    }

    /**
     * Get the default content of a falloff tooltip
     */
    private getFalloffTooltip(falloff: number): string {
        return falloff.toLocaleString('en') + ' items';
    }

}

export interface SankeyColumn {
    width: number;
    title: string;
    position: number;
}

export interface SankeyTooltipPosition {
    x: number;
    y: number;
}

export interface SankeyNodeContext<T> {
    node: SankeyNode<T>;
    active: boolean;
    focus: boolean;
}
