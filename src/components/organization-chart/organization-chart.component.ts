import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, ApplicationRef, ChangeDetectionStrategy, Component, ComponentFactoryResolver, ContentChild, ElementRef, EventEmitter, Injector, Input, NgZone, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { hierarchy, HierarchyPointLink, HierarchyPointNode, tree } from 'd3-hierarchy';
import { interpolate } from 'd3-interpolate';
import { event, select, Selection } from 'd3-selection';
import { linkVertical } from 'd3-shape';
import { transition } from 'd3-transition';
import { zoom, ZoomBehavior, ZoomTransform, zoomTransform } from 'd3-zoom';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FocusIndicator, FocusIndicatorService } from '../../directives/accessibility/index';
import { ResizeDimensions, ResizeService } from '../../directives/resize/index';

@Component({
    selector: 'ux-organization-chart',
    templateUrl: './organization-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationChartComponent<T> implements AfterViewInit, OnChanges, OnDestroy {

    /** Define the root node of the chart */
    @Input() dataset: OrganizationChartNode<T>;

    /** Define the presentation of the connectors */
    @Input() connector: OrganizationChartConnector = 'elbow';

    /** Define the width of a node */
    @Input() nodeWidth: number;

    /** Define the height of a node */
    @Input() nodeHeight: number;

    /** Define the duration of the transition animations */
    @Input() duration: number = 750;

    /** Define the vertical space between nodes */
    @Input() verticalSpacing: number;

    /** Define whether or not we can reveal additional parents */
    @Input() showReveal: boolean = false;

    /** Define the aria label for the reveal button */
    @Input() revealAriaLabel: string = 'Reveal More';

    /** Programmatically select an item */
    @Input() set selected(selected: OrganizationChartNode<T>) {
        if (this.selected === selected || !selected) {
            return;
        }

        if (this._isInitialised) {
            this.select(selected);
            this.centerNode(selected);
        } else {
            this._pendingSelection = selected;
        }
    }

    /** Emit whenever a node is selected */
    @Output() selectedChange = new EventEmitter<OrganizationChartNode<T>>(true);

    /** Emit whenever the reveal button is pressed */
    @Output() reveal = new EventEmitter<void>();

    /** Get the template for the node content */
    @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<OrganizationChartNodeContext<T>>;

    /** Access the reveal button element */
    @ViewChild('revealElement') revealElement: ElementRef;

    /** Access the container element for the links */
    @ViewChild('links') linksContainer: ElementRef;

    /** Access the container element for the nodes */
    @ViewChild('nodes') nodesContainer: ElementRef;

    /** Store the internal selected node */
    private _selected: OrganizationChartNode<T>;

    /** Store a flattened array of nodes */
    private _nodeLayout: HierarchyPointNode<OrganizationChartNode<T>>[] = [];

    /** Store a flattened array of links */
    private _linkLayout: HierarchyPointLink<OrganizationChartNode<T>>[] = [];

    /** Store the links selection */
    private _linksContainer: Selection<SVGElement, {}, null, undefined>;

    /** Store the links selection */
    private _nodesContainer: Selection<HTMLDivElement, {}, null, undefined>;

    /** Store all the node elements */
    private _nodes: Selection<HTMLDivElement, HierarchyPointNode<OrganizationChartNode<T>>, HTMLDivElement, HierarchyPointNode<OrganizationChartNode<T>>>;

    /** Store all the link paths */
    private _links: Selection<SVGElement, HierarchyPointLink<OrganizationChartNode<T>>, SVGElement, HierarchyPointLink<OrganizationChartNode<T>>>;

    /** Store the zoom behavior */
    private _zoom: ZoomBehavior<Element, {}>;

    /** Store the current layout */
    private _layout: HierarchyPointNode<OrganizationChartNode<T>>;

    /** Store the current width of the chart */
    private _width: number;

    /** Store the current height of the chart */
    private _height: number;

    /** Store the portal/outlets associated with some data */
    private _portals = new Map<OrganizationChartNode<T>, OrganizationChartPortalRef>();

    /** Store the focus indicators associated with nodes */
    private _indicators = new Map<OrganizationChartNode<T>, FocusIndicator>();

    /** Store whether or not a transition is in progress */
    private _isTransitioning: boolean = false;

    /** Store whether or not a camera pan is in progress */
    private _isPanning: boolean = false;

    /** Determine if the component is initialised */
    private _isInitialised: boolean = false;

    /** Determine if the connector type has changed since the last render */
    private _hasConnectorChanged: boolean = false;

    /** Store the currently focused node if there is one */
    private _focused: OrganizationChartNode<T>;

    /** Store any selection made before the chart is initialised */
    private _pendingSelection: OrganizationChartNode<T>;

    /** Automatically unsubscribe from all subscriptions on destroy */
    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _resizeService: ResizeService,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _injector: Injector,
        private _appRef: ApplicationRef,
        private _viewContainerRef: ViewContainerRef,
        private _renderer: Renderer2,
        private _focusIndicator: FocusIndicatorService,
        private _ngZone: NgZone
    ) { }

    ngAfterViewInit(): void {

        // before we do anything ensure they have provided a template
        if (!this.nodeTemplate) {
            throw new Error('Organization Chart - You must provide a node template!');
        }

        if (!this.nodeWidth || !this.nodeHeight) {
            throw new Error('Organization Chart - You must specify a nodeWidth and nodeHeight');
        }

        // create the zoom drag listener
        this._zoom = zoom()
            .scaleExtent([1, 1])
            .interpolate(interpolate)
            .on('zoom', this.applyCameraPosition.bind(this))
            .on('end', () => {
                if (!this._isPanning) {
                    this.ensureNodesAreVisible();
                }
            });

        // set up the selections
        this._linksContainer = select(this.linksContainer.nativeElement);
        this._nodesContainer = select(this.nodesContainer.nativeElement);

        // setup the zoom on the node layer
        this._nodesContainer.call(this._zoom);

        // perform the initial render
        this.render();

        // ensure we set the initial chart size
        this._width = this._elementRef.nativeElement.offsetWidth;
        this._height = this._elementRef.nativeElement.offsetHeight;

        // watch for any resizing of the chart
        const resize$ = this._resizeService.addResizeListener(this._elementRef.nativeElement);

        // on size change immediate update the width and height measurements
        resize$.pipe(takeUntil(this._onDestroy))
            .subscribe(this.onResize.bind(this));

        // after a debounce ensure nodes are visible
        resize$.pipe(takeUntil(this._onDestroy), debounceTime(this.duration))
            .subscribe(this.ensureNodesAreVisible.bind(this));

        // initially horizontally center the root node
        this.centerNode(this.dataset, OrganizationChartAxis.Horizontal, false);

        // initally move the camera down slightly so the root node does not appear at the very top of the chart
        this.moveCamera(0, 150, false);

        // mark this component as initialised
        this._isInitialised = true;
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.connector && !changes.connector.firstChange) {
            this._hasConnectorChanged = true;
        }

        // if only the selected property has changed then don't re-render as this is handled by the setter
        if (Object.keys(changes).length === 1 && changes.selected) {
            return;
        }

        if (this._isInitialised) {
            this.render();
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();

        // correctly dispose all portals and outlets
        this._portals.forEach(node => {
            node.portal.detach();
            node.outlet.dispose();
        });
    }

    /** Perform the actual rendering of the chart */
    render(): void {

        // perform the layout algorithm on the current dataset
        this.updateLayout();

        // select all the existing links and nodes
        this.updateSelections();

        // create a d3 transition based in the specified transition time
        const defaultTransition = transition()
            .duration(this.duration)
            .on('start', () => this._isTransitioning = true)
            .on('end', () => this._isTransitioning = false);

        // render the links when they are first added to the DOM
        this._links.enter()
            .insert('path')
            .attr('class', 'ux-organization-chart-link')
            .attr('d', link => this.getLinkPath(link))
            .attr('opacity', -2)
            .transition(defaultTransition)
            .attr('d', link => this.getLinkPath(link))
            .attr('opacity', 1);

        // define the standard transition while the link is 'alive'
        this._links.transition()
            .duration(this._hasConnectorChanged ? 0 : this.duration)
            .attr('d', link => this.getLinkPath(link));

        // apply transitions when removing nodes
        this._links.exit()
            .transition(defaultTransition)
            .attr('d', (link: HierarchyPointLink<OrganizationChartNode<T>>) => this.getCollapsedLinkPath(link))
            .attr('opacity', 0)
            .remove();

        // when a node is first added to the DOM position it
        this._nodes.enter()
            .append('div')
            .attr('class', 'ux-organization-chart-node')
            .style('width', this.nodeWidth + 'px')
            .style('height', this.nodeHeight + 'px')
            .style('left', node => (node.parent ? node.parent.x : node.x) + 'px')
            .style('top', node => (node.parent ? node.parent.y : node.y) + 'px')
            .style('opacity', 0)
            .on('keydown', this.onKeydown.bind(this))
            .on('focus', this.onFocus.bind(this))
            .on('mousedown', () => event.stopPropagation())
            .on('click', this.toggle.bind(this))
            .each(this.renderNodeTemplate.bind(this))
            .each((node, index, group) => this.monitorFocus(group[index], node))
            .transition(defaultTransition)
            .style('left', node => node.x + 'px')
            .style('top', node => node.y + 'px')
            .style('opacity', 1);

        // apply any movements while nodes are 'alive'
        this._nodes.transition(defaultTransition)
            .style('left', node => node.x + 'px')
            .style('top', node => node.y + 'px');

        // apply transitions when removing nodes
        this._nodes.exit()
            .transition(defaultTransition)
            .style('left', (node: HierarchyPointNode<OrganizationChartNode<T>>) => (node.parent ? node.parent.x : node.x) + 'px')
            .style('opacity', 0)
            .remove()
            .on('end', (node: HierarchyPointNode<OrganizationChartNode<T>>) => this.destroyNode(node));

        // update the position of the reveal button
        select(this.revealElement.nativeElement)
            .style('left', ((this.nodeWidth / 2) - (this.revealElement.nativeElement.offsetWidth / 2)) + 'px')
            .style('top', -((this.nodeHeight / 2) + (this.revealElement.nativeElement.offsetHeight / 2)) + 'px');

        // after any new links and nodes have been created or removed we should update the selections
        this.updateSelections();

        // update the selected classes - ensure there is always a selected node
        if (!this._selected) {
            this.select(this._pendingSelection || this.dataset);
            this._pendingSelection = null;
        }

        // set the tab indexes and aria labels for any newly added items
        this.setNodeAttributes();

        // apply the current camera position to any new nodes/links
        this.applyCameraPosition();

        // reset the connector changed status
        this._hasConnectorChanged = false;
    }

    /** Select a specified node */
    select(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): void {

        // get the node in the desired format
        node = this.coerceDataNode(node) as OrganizationChartNode<T>;

        // check if the node is already selected
        if (this._selected === node) {
            return;
        }

        // ensure all parents are expanded
        this.expandParents(node);

        // deselect any current node
        this.deselect(false);

        // if the selected item has changed then store the latest selection
        this._selected = node;

        // emit the latest selection
        this.selectedChange.next(this._selected);

        // update the tab indexes and aria labels
        if (this._isInitialised) {
            this.render();
        }

        // add the styling to the selected node
        this._renderer.addClass(this.getNodeElement(this._selected), 'ux-organization-chart-node-selected');

        // update the styling and tabindexes
        this.setNodeAttributes();

    }

    /** Deselect the currently selected node */
    private deselect(emit: boolean = true): void {

        if (this._nodes) {
            this._nodes.nodes().forEach(element => this._renderer.removeClass(element, 'ux-organization-chart-node-selected'));
        }

        if (emit && !!this._selected) {
            this._selected = null;
            this.selectedChange.next(null);

            // update the tab indexes and aria labels
            this.setNodeAttributes();
        }
    }

    /** Toggle the collapsed state of a node */
    toggle(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): void {

        // do nothing if a transition is currently in progress
        if (this._isTransitioning) {
            return;
        }

        // get the node in the desired format
        node = this.coercePointNode(node) as HierarchyPointNode<OrganizationChartNode<T>>;

        // ensure the clicked node is selected
        this.select(node);

        // apply the appropriate action
        this.isExpanded(node) ? this.collapse(node) : this.expand(node);
    }

    /** Expand a node */
    expand(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): void {

        // do nothing if a transition is currently in progress
        if (this._isTransitioning) {
            return;
        }

        // get the node in the desired format
        node = this.coercePointNode(node) as HierarchyPointNode<OrganizationChartNode<T>>;

        // ensure this node and all parent nodes are expanded
        node.ancestors().forEach(_node => _node.data.expanded = true);

        // re-render the nodes
        this.render();

        // if the node has children then we want to move the camera to a child node
        if (Array.isArray(node.data.children) && node.data.children.length > 0) {
            // center on the middle child
            this.centerNode(node.data.children[Math.floor(node.data.children.length / 2)]);
        } else {
            this.centerNode(node);
        }
    }

    /** Collapse a node */
    collapse(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): void {
        // do nothing if a transition is currently in progress
        if (this._isTransitioning) {
            return;
        }

        // get the node in the desired format
        node = this.coercePointNode(node) as HierarchyPointNode<OrganizationChartNode<T>>;

        // ensure this node and all child nodes are collapse
        node.descendants().forEach(_node => _node.data.expanded = false);

        // re-render the nodes
        this.render();

        // center the node that has just been collapsed
        this.centerNode(node);
    }

    /** Move a specific node to the center of the screen */
    centerNode(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>, axis: OrganizationChartAxis = OrganizationChartAxis.Both, animate: boolean = true): void {

        // get the node in the desired format
        node = this.coercePointNode(node) as HierarchyPointNode<OrganizationChartNode<T>>;

        // get the current camera position
        const camera = this.getCameraPosition();

        const x = axis === OrganizationChartAxis.Vertical ? camera.x : (this._width / 2) - (node.x + (this.nodeWidth / 2));
        const y = axis === OrganizationChartAxis.Horizontal ? camera.y : (this._height / 2) - (node.y + (this.nodeHeight / 2));

        // update the camera position
        this.setCameraPosition(x, y, animate);
    }

    /** Explicity set the position of the camera */
    setCameraPosition(x: number, y: number, animate: boolean = true): void {

        // get the current transform
        let camera = zoomTransform(this._nodesContainer.node());

        // do nothing if the co-orindates have not changed
        if (camera.x === x && camera.y === y) {
            return;
        }

        // update the camera position
        camera = camera.translate(x - camera.x, y - camera.y);

        // indicate that the camera is panning programmatically
        this._isPanning = true;

        if (animate) {
            this._nodesContainer.transition()
                .duration(this.duration)
                .call(this._zoom.transform, camera)
                .on('end interrupt cancel', () => this._isPanning = false);
        } else {
            this._nodesContainer.call(this._zoom.transform, camera);
            this._isPanning = false;
        }
    }

    /** Move the camera an amount from its current position */
    moveCamera(x: number, y: number, animate: boolean = true): void {

        // get the current camera position
        const camera = this.getCameraPosition();

        this.setCameraPosition(camera.x + x, camera.y + y, animate);
    }

    /** Focus the root node */
    _focusRootNode(): void {
        this.focusNode(this.coercePointNode(this.dataset));
    }

    /** Destroy the outlet and portal associated with a node */
    private destroyNode(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): void {

        // get the node in a consistent format
        node = this.coercePointNode(node);

        // remove focus monitoring
        if (this._indicators.has(node.data)) {
            // remove the focus monitoring
            this._indicators.get(node.data).destroy();

            // remove the indicator from the list of indicators
            this._indicators.delete(node.data);
        }

        // if there is not portal/outlets associated with this node then do nothing
        if (!this._portals.has(node.data)) {
            return;
        }

        // get the portal and outlet from the map
        const portalRef = this._portals.get(node.data);

        // perform the cleanup
        portalRef.portal.detach();
        portalRef.outlet.dispose();

        // remove this entry from the map
        this._portals.delete(node.data);
    }

    // update the data structure for the node and link layouts
    private updateLayout(): void {
        this._layout = this.getLayout();
        this._nodeLayout = this._layout.descendants();
        this._linkLayout = this._layout.links();
    }

    /** Ensure the selections stay in sync with the view */
    private updateSelections(): void {
        // select all the newly added dom nodes and associate the dataset
        this._nodes = this._nodesContainer.selectAll('.ux-organization-chart-node')
            .data(this._nodeLayout, (node: HierarchyPointNode<OrganizationChartNode<T>>) => node.data.id.toString()) as Selection<HTMLDivElement, HierarchyPointNode<OrganizationChartNode<T>>, HTMLDivElement, HierarchyPointNode<OrganizationChartNode<T>>>;

        // select all the newly added path nodes
        this._links = this._linksContainer.selectAll('.ux-organization-chart-link')
            .data(this._linkLayout, (link: HierarchyPointLink<OrganizationChartNode<T>>) => {
                return `${link.source.data.id}-${link.target.data.id}`;
            }) as Selection<SVGElement, HierarchyPointLink<OrganizationChartNode<T>>, SVGElement, HierarchyPointLink<OrganizationChartNode<T>>>;
    }

    /** Render the content of the node based on the template provided */
    private renderNodeTemplate(node: HierarchyPointNode<OrganizationChartNode<T>>, index: number, group: HTMLElement[]) {

        // create the context for the node
        const context: OrganizationChartNodeContext<T> = {
            data: node.data.data,
            node: node.data,
            focused: false
        };

        // the focused state should be a getter
        Object.defineProperty(context, 'focused', {
            get: () => this._focused === node.data
        });

        // create the outlet to insert the Template and the portal from the TemplateRef
        const outlet = this.createPortalOutlet(group[index]);
        const portal = new TemplatePortal<OrganizationChartNodeContext<T>>(this.nodeTemplate, this._viewContainerRef, context);

        // insert the TemplateRef into the specified region
        portal.attach(outlet);

        // store the portal and outlet so we can correctly dispose of the nodes
        this._portals.set(node.data, { portal, outlet });
    }

    /** Handle any zoom events (we use zoom for panning behaviour) */
    private applyCameraPosition(): void {
        // get the new x and y position
        let { x, y } = zoomTransform(this._nodesContainer.node());

        // round the precision to integers to prevent any anti-aliasing
        x = Math.round(x);
        y = Math.round(y);

        // transform the position of the reveal button
        this._renderer.setStyle(this.revealElement.nativeElement, 'transform', `translate(${x}px, ${y}px)`);

        // transform the position of the nodes
        this._nodesContainer.selectAll('.ux-organization-chart-node').style('transform', `translate(${x}px, ${y}px)`);

        // transform the position of the links
        this._linksContainer.selectAll('.ux-organization-chart-link').attr('transform', `translate(${x} ${y})`);
    }

    /** Get the data in with the required layout information */
    private getLayout(): HierarchyPointNode<OrganizationChartNode<T>> {

        // create a hierarchical representation of the data - don't include collapsed nodes
        const treeHierarchy = hierarchy(this.dataset, node => Array.isArray(node.children) && node.expanded ? node.children : []);

        // create our layout
        const layout = tree<OrganizationChartNode<T>>()
            .nodeSize([this.nodeWidth, this.nodeHeight])
            .separation(this.getNodeSpacing.bind(this));

        // process the data with the layout
        const treeLayout = layout(treeHierarchy);

        // calculate the vertical spacing
        const verticalSpacing = this.verticalSpacing === undefined ? this.nodeHeight : this.verticalSpacing;

        // set the vertical spacing
        treeLayout.each(data => data.y = data.depth * (this.nodeHeight + verticalSpacing));

        return treeLayout;
    }

    /** Determine how much horizontal spacing should be between nodes */
    private getNodeSpacing(nodeOne: HierarchyPointNode<OrganizationChartNode<T>>, nodeTwo: HierarchyPointNode<OrganizationChartNode<T>>): number {
        // if the nodes are not siblings then space further apart
        if (nodeOne.parent !== nodeTwo.parent) {
            return 2;
        }

        // if they are siblings they should be closer together
        return 1.5;
    }

    /** Ensure we consistently use the HierarchyPoint data structure */
    private coercePointNode(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): HierarchyPointNode<OrganizationChartNode<T>> {
        // determine if this is a raw data node or a hierarchy point
        if (node.hasOwnProperty('depth') && node.hasOwnProperty('x') && node.hasOwnProperty('y')) {
            return node as HierarchyPointNode<OrganizationChartNode<T>>;
        }

        // otherwise find the matching node
        const match = this._nodeLayout.find(_node => _node.data === node);

        // if the data does not exist in the hierarchy throw an exception
        if (!match) {
            throw new Error(`The node does not exist in the hierarchy`);
        }

        return match;
    }

    private coerceDataNode(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): OrganizationChartNode<T> {
        if (node.hasOwnProperty('depth') && node.hasOwnProperty('x') && node.hasOwnProperty('y')) {
            return (node as HierarchyPointNode<OrganizationChartNode<T>>).data;
        }

        return node as OrganizationChartNode<T>;
    }

    /** Handle chart resize events */
    private onResize({ width, height }: ResizeDimensions): void {
        this._width = width;
        this._height = height;
    }

    /** Deteremine if a node is expanded or collapsed */
    private isExpanded(node: HierarchyPointNode<OrganizationChartNode<T>>): boolean {
        return !!node.data.expanded;
    }

    /** Get the current position of the camera */
    private getCameraPosition(): ZoomTransform {
        return zoomTransform(this._nodesContainer.node());
    }

    /** Get the SVG line definition for each link */
    private getLinkPath(pointLink: HierarchyPointLink<OrganizationChartNode<T>>): string {

        if (this.connector === 'elbow') {

            const source = { x: pointLink.source.x + (this.nodeWidth / 2), y: pointLink.source.y + this.nodeHeight };
            const target = { x: pointLink.target.x + (this.nodeWidth / 2), y: pointLink.target.y };

            return 'M' + source.x + ',' + (source.y) +
                'v' + ((target.y - source.y) / 2) +
                'h' + (target.x - source.x) +
                'v' + ((target.y - source.y) / 2);

        } else {

            const source = { x: pointLink.source.x + (this.nodeWidth / 2), y: pointLink.source.y + (this.nodeHeight / 2) };
            const target = { x: pointLink.target.x + (this.nodeWidth / 2), y: pointLink.target.y + (this.nodeHeight / 2) };

            return linkVertical()({ source: [source.x, source.y], target: [target.x, target.y] });
        }
    }

    /** Get the link path line defintion when the link is collapsing */
    private getCollapsedLinkPath(pointLink: HierarchyPointLink<OrganizationChartNode<T>>): string {
        return this.getLinkPath({ source: pointLink.source, target: pointLink.source });
    }

    /** Create a dynamic region that Angular can insert into */
    private createPortalOutlet(element: HTMLElement): DomPortalOutlet {
        return new DomPortalOutlet(element, this._componentFactoryResolver, this._appRef, this._injector);
    }

    /** Make the appropriate node tabbable and update aria attributes */
    private setNodeAttributes(): void {

        for (const element of this._nodes.nodes()) {
            // intially the tab index of all items to -1
            this._renderer.setAttribute(element, 'tabindex', '-1');

            // set the expanded aria attribute
            this._renderer.setAttribute(element, 'aria-expanded', !!this.getNodeData(element).data.expanded ? 'true' : 'false');
        }

        // if there is a selected item then it should be tabbable otherwise make the root tabbable
        if (this._selected) {
            this._renderer.setAttribute(this.getNodeElement(this._selected), 'tabindex', '0');
        }
    }

    /** Get the element that represents a given node */
    private getNodeElement(node: OrganizationChartNode<T> | HierarchyPointNode<OrganizationChartNode<T>>): HTMLDivElement {
        node = this.coercePointNode(node);

        // find the element that matches the node data
        const index = this._nodes.data().indexOf(node);

        return this._nodes.nodes()[index];
    }

    /** Get the element that represents a given node */
    private getNodeData(node: HTMLDivElement): HierarchyPointNode<OrganizationChartNode<T>> {

        // find the element that matches the node element
        const index = this._nodes.nodes().indexOf(node);

        return this._nodes.data()[index];
    }

    /** Handle keyboard events */
    private onKeydown(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        switch (event.keyCode) {
            case DOWN_ARROW:
                event.preventDefault();
                // if the node is collapsed and has children expand
                if (!node.data.expanded && Array.isArray(node.data.children) && node.data.children.length > 0) {
                    return this.expand(node);
                }
                return this.focusChild(node);

            case RIGHT_ARROW:
                event.preventDefault();
                return this.focusNextSibling(node);

            case UP_ARROW:
                event.preventDefault();
                return this.focusParent(node);

            case LEFT_ARROW:
                event.preventDefault();
                return this.focusPreviousSibling(node);

            case ENTER:
                return this.toggle(node);
        }
    }

    /** When a node receives focus */
    private onFocus(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        if (!this.isNodeInViewport(node, this._width * 0.1, this._height * 0.1)) {
            this.centerNode(node);
        }
    }

    /** Move focus to the parent node */
    private focusParent(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        if (node.parent) {
            this.focusNode(node.parent);
        } else if (this.revealElement) {
            this.revealElement.nativeElement.focus();
            // center the root node to ensure the reveal button is in view
            this.centerNode(this.dataset);
        }
    }

    /** Move focus to the child node */
    private focusChild(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        if (Array.isArray(node.children) && node.children.length > 0) {
            this.focusNode(node.children[Math.floor(node.children.length / 2)]);
        }
    }

    /** Move focus to the sibling on the left */
    private focusPreviousSibling(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        if (node.parent) {
            this.focusNode(node.parent.children[node.parent.children.indexOf(node) - 1]);
        }
    }

    /** Move focus to the sibling on the right */
    private focusNextSibling(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        if (node.parent) {
            this.focusNode(node.parent.children[node.parent.children.indexOf(node) + 1]);
        }
    }

    /** Focus a given node */
    private focusNode(node: HierarchyPointNode<OrganizationChartNode<T>>): void {
        if (node) {
            this.getNodeElement(node).focus({ preventScroll: true });

            // ensure we don't perform scrolling if the node is not in view (we rely on preventScroll as IE doesn't support it)
            this.nodesContainer.nativeElement.scrollTop = 0;
            this.nodesContainer.nativeElement.scrollLeft = 0;
        }
    }

    /** Determine if a node is fully visible within the viewport */
    private isNodeInViewport(node: HierarchyPointNode<OrganizationChartNode<T>>, insetX: number = 0, insetY: number = 0): boolean {
        const { x, y } = this.getCameraPosition();

        const left = node.x + x;
        const top = node.y + y;
        const right = node.x + x + this.nodeWidth;
        const bottom = node.y + y + this.nodeHeight;

        return left >= insetX && top >= insetY && right <= (this._width - insetX) && bottom <= (this._height - insetY);
    }

    /** Determine if a node is fully outside of the viewport */
    private isNodeOutsideViewport(node: HierarchyPointNode<OrganizationChartNode<T>>, insetX: number = 0, insetY: number = 0): boolean {
        const { x, y } = this.getCameraPosition();

        const left = node.x + x + this.nodeWidth;
        const top = node.y + y + this.nodeHeight;
        const right = node.x + x;
        const bottom = node.y + y;

        return left < insetX || top < insetY || right > (this._width - insetX) || bottom > (this._height - insetY);
    }

    /** Determine how far a node is from being within the viewport */
    private getDistanceFromViewport(node: HierarchyPointNode<OrganizationChartNode<T>>, insetX: number = 0, insetY: number = 0): [number, number] {

        // if the node is in the viewport then it will always be 0, 0
        if (!this.isNodeOutsideViewport(node, insetX, insetY)) {
            return [0, 0];
        }

        const { x, y } = this.getCameraPosition();

        const left = insetX - (node.x + x + this.nodeWidth);
        const top = insetY - (node.y + y + this.nodeHeight);
        const right = (node.x + x) - (this._width - insetX);
        const bottom = (node.y + y) - (this._height - insetY);

        let horizontal: number = 0;
        let vertical: number = 0;

        if (left > 0 && left > right) {
            horizontal = left;
        }

        if (right > 0 && left < right) {
            horizontal = -right;
        }

        if (top > 0 && top > bottom) {
            vertical = top;
        }

        if (bottom > 0 && top < bottom) {
            vertical = -bottom;
        }

        // calculate the distances on both axis
        return [horizontal, vertical];
    }

    /** Begin monitoring the element focus so we only show styling when navigated by keyboard */
    private monitorFocus(element: HTMLDivElement, node: HierarchyPointNode<OrganizationChartNode<T>>): void {

        // create the focus indicator
        const indicator = this._focusIndicator.monitor(element, { checkChildren: false, programmaticFocusIndicator: true });

        // store the currently selected node as an instance variable
        indicator.isFocused$.pipe(takeUntil(this._onDestroy)).subscribe(isFocused => {
            // by default the CDK runs this outside of NgZone however we need it to run inside NgZone to update the node template
            this._ngZone.run(() => {
                if (isFocused) {
                    this._focused = node.data;
                } else if (node.data === this._focused) {
                    this._focused = null;
                }
            });
        });

        // store the focus indicator reference
        this._indicators.set(node.data, indicator);
    }

    // ensure that there are at least some nodes visible
    private ensureNodesAreVisible(): void {

        // determine how many nodes are currently visible
        const visibleCount = this._nodes.filter(node => !this.isNodeOutsideViewport(node)).size();

        if (visibleCount > 0) {
            return;
        }

        // get the distance each node is from being within the viewport
        const distances = this._nodes.data().map(node => this.getDistanceFromViewport(node, this.nodeWidth * 1.25, this.nodeHeight * 1.5));

        // find the closest node
        const [x, y] = distances.reduce((previous, current) => {
            const [previousX, previousY] = previous;
            const [currentX, currentY] = current;

            return (Math.abs(previousX) + Math.abs(previousY)) < (Math.abs(currentX) + Math.abs(currentY)) ? previous : current;
        });

        // move the camera by the required amount
        this.moveCamera(x, y);
    }

    /** Expand all parent nodes */
    private expandParents(node: OrganizationChartNode<T>): void {

        // get the parent node
        let parent = this.getParent(node);

        while (parent) {
            parent.expanded = true;
            parent = this.getParent(parent);
        }
    }

    /** Get the parent of a given node */
    private getParent(node: OrganizationChartNode<T>): OrganizationChartNode<T> | null {
        return [this.coerceDataNode(this.dataset), ...this.getAllChildren(this.dataset)].find(_node => {
            if (!Array.isArray(_node.children)) {
                return false;
            }

            return _node.children.find((child: OrganizationChartNode<T>) => child.id === node.id);
        });
    }

    /** Get a flat array of all the nodes childrent */
    private getAllChildren(node: OrganizationChartNode<T>): OrganizationChartNode<T>[] {
        const children = node.children || [];

        // check for any children on the children
        return [...children, ...children.reduce((accumulation, child) => [...accumulation, ...this.getAllChildren(child)], [])].map(child => this.coerceDataNode(child));
    }

}

export interface OrganizationChartNode<T> {
    id: number | string;
    data?: T;
    children?: ReadonlyArray<OrganizationChartNode<T>>;
    expanded?: boolean;
}

export interface OrganizationChartNodeContext<T> {
    data: T;
    node: OrganizationChartNode<T>;
    focused: boolean;
}

export interface OrganizationChartPortalRef {
    outlet: DomPortalOutlet;
    portal: TemplatePortal;
}

export type OrganizationChartConnector = 'elbow' | 'curved';

export enum OrganizationChartAxis {
    Horizontal,
    Vertical,
    Both
}
