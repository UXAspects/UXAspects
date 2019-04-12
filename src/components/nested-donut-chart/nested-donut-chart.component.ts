import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { easeCubic } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { BaseType, mouse, select, Selection } from 'd3-selection';
import { arc, Arc } from 'd3-shape';
import { transition } from 'd3-transition';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Color } from '../../common/colors/index';
import { ResizeService } from '../../directives/resize/index';
import { ColorService, ThemeColor } from '../../services/color/index';
import { AnchorPlacement } from '../tooltip/index';

@Component({
    selector: 'ux-nested-donut-chart',
    templateUrl: './nested-donut-chart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedDonutChartComponent implements OnInit, OnChanges, OnDestroy {

    /** Define a the dataset to display */
    @Input() dataset: ReadonlyArray<NestedDonutChartData>;

    /** Define the maximum range of the arcs */
    @Input() max: number = 100;

    /** Define the thickness of each arc */
    @Input() thickness: number = 8;

    /** Define the spacing of each arc */
    @Input() spacing: number = 8;

    /** Define the track color */
    @Input() trackColor: string | ThemeColor;

    /** Determine if we should show the hover effect */
    @Input() disableHover: boolean = false;

    /** Determine if we should show a tooltip on arc hover */
    @Input() disableTooltip: boolean = false;

    /** Determine the position of the tooltip */
    @Input() tooltipPlacement: AnchorPlacement = 'top';

    /** Set the duration of the animation */
    @Input() animationDuration: number = 750;

    /** Emit whenever an arc is clicked */
    @Output() itemClick = new EventEmitter<NestedDonutChartData>();

    /** Access the SVG element */
    @ViewChild('chart') _chartElement: ElementRef;

    /** Allow custom tooltip template */
    @ContentChild('tooltip') _customTooltip: TemplateRef<NestedDonutChartData>;

    /** Indicate if the tooltip should be visible */
    _tooltipVisible: boolean = false;

    /** Store the tooltip x position */
    _tooltipX: number;

    /** Store the tooltip y position */
    _tooltipY: number;

    /** Store the context to provide to the tooltip */
    _tooltipContext: NestedDonutChartData;

    /** Determine the radius of the chart based on the specified size */
    get _radius(): number {
        return this._size / 2;
    }

    /**
     * Get the size of the chart. The chart will always be square to
     * the size will be the smaller of the width/height properties
     */
    get _size(): number {
        return Math.min(this._elementRef.nativeElement.offsetWidth, this._elementRef.nativeElement.offsetHeight);
    }

    /** Store the selection when the arcs will be drawn */
    private _arcLayer: Selection<BaseType, NestedDonutChartData, HTMLElement, NestedDonutChartData>;

    /** Store the selection when the tracks will be drawn */
    private _trackLayer: Selection<BaseType, NestedDonutChartData, HTMLElement, NestedDonutChartData>;

    /** Store the arc selection */
    private _arcs: Selection<BaseType, NestedDonutChartArc, BaseType, NestedDonutChartData>;

    /** Store the tracks selection */
    private _tracks: Selection<BaseType, NestedDonutChartArc, BaseType, NestedDonutChartData>;

    /** Store the previously processed data */
    private _arcData: NestedDonutChartArc[] = [];

    /** Determine if the intial render has taken place */
    private _isInitialized: boolean = false;

    /** Unsubscribe from all observables automatically */
    private _onDestroy = new Subject<void>();

    constructor(
        private _colorService: ColorService,
        private _changeDetector: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _resizeService: ResizeService
    ) { }

    /** Perform the initial render */
    ngOnInit(): void {
        // create the selection where we will draw the tracks
        this._trackLayer = select<SVGElement, NestedDonutChartData>(this._chartElement.nativeElement)
            .append('g');

        // create the selection where we will draw the arcs
        this._arcLayer = select<SVGElement, NestedDonutChartData>(this._chartElement.nativeElement)
            .append('g');

        // create the arcs representing the data
        this.render();

        // mark the component as initialized
        this._isInitialized = true;

        // listen for any resizing - skip the first emission as it always emits on first subscribe
        this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this.render();
                this._changeDetector.markForCheck();
            });
    }

    /** Any time an input changes we must re-render the chart */
    ngOnChanges(): void {
        if (this._isInitialized) {
            this.render();
        }
    }

    ngOnDestroy(): void {
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Inset the content so it never overlaps the arcs */
    _getContentInset(): number {
        return this.dataset.length * (this.spacing + this.thickness);
    }


    /** Get the dimensions of the content area */
    _getContentSize(): number {
        return this._size - (this._getContentInset() * 2);
    }

    /** Get the dataset formated in an accessible manner */
    _getAriaLabel(): string {
        return this.dataset.map(data => `${data.value} ${data.name}`).join('. ');
    }

    /**
     * Display the tracks and arcs defined by the dataset.
     * We also provide the transition configuration so anytime the dataset
     * changes we will animate the update.
     */
    private render(): void {

        // update the transform of the layers
        this._trackLayer.attr('transform', `translate(${this._radius}, ${this._radius})`);
        this._arcLayer.attr('transform', `translate(${this._radius}, ${this._radius})`);

        // create the arcs based on the dataset
        this._arcs = this._arcLayer.selectAll('path')
            .data(this.getChartData());

        // create the default transition based on the specified duration
        const arcTransition = transition().ease(easeCubic).duration(this.animationDuration);

        // create the tracks based on the dataset
        this._tracks = this._trackLayer.selectAll('path')
            .data(this.getChartData())
            .enter()
            .append('path')
            .attr('class', 'nested-donut-chart-track');

        // set the track color on each render in case the input has changed
        this._trackLayer.selectAll('path')
            .attr('d', this.getTrackArc())
            .style('fill', () => this.getTrackColor());

        // if an arc is removed then also remove the track
        this._tracks.exit().remove();

        // When a new arc is added we should create the element
        // size it and provide the background color and begin the
        // animation until it reaches its final angle
        this._arcs.enter()
            .append('path')
            .attr('class', 'nested-donut-chart-arc')
            .style('fill', data => this.getColor(data.color))
            .attr('opacity', 1)
            .on('click', data => this.itemClick.emit(data))
            .on('mouseenter', (data, index, nodes) => this.onArcMouseEnter(nodes[index], data))
            .on('mousemove', () => this.onArcMouseMove(mouse(this._chartElement.nativeElement)))
            .on('mouseleave', (_data, index, nodes) => this.onArcMouseLeave(nodes[index]))
            .transition(arcTransition)
            .attrTween('d', this.getArcTween.bind(this));

        // any time an existing dataset value changes
        // we should update the angle with an animation
        // we also animate any color changes also.
        this._arcs.transition(arcTransition)
            .style('fill', data => this.getColor(data.color))
            .attrTween('d', this.getArcTween.bind(this));

        // when a dataset it removed animate the arc out
        // and then remove the associated DOM element
        this._arcs.exit().transition(arcTransition)
            .attrTween('d', this.getArcTween.bind(this))
            .remove();
    }

    /** Get the interpolation function based on the new and previous angle */
    private getArcTween(data: NestedDonutChartArc) {

        // create a new interpolation function with a new endAngle
        const interpolation = interpolate({ ...data, endAngle: data.previousEndAngle }, data);

        // return the function that will produce the interpolation
        return (delta: number) => this.getArc()(interpolation(delta));
    }

    /** Get the arc layout for a specific item in the dataset */
    private getArc(): Arc<any, NestedDonutChartArc> {
        return arc<NestedDonutChartArc>()
            .innerRadius(data => this.getArcRadius(data.index))
            .outerRadius(data => this.getArcRadius(data.index) + this.thickness)
            .startAngle(data => data.startAngle)
            .endAngle(data => data.endAngle);
    }

    /**
     * Get the track arc layout for a specific item in the dataset.
     * This will match the arc of that represents the actual data
     * however the endAngle will always be a complete circle
     */
    private getTrackArc(): Arc<any, NestedDonutChartArc> {
        return this.getArc().endAngle(() => Math.PI * 2);
    }

    /**
     * Get the radius of an arc. This is calculated
     * based on the chart radius that has been defined,
     * minus the thickness defined, then taking into account
     * the depth of the arc and the spacing between each arc.
     */
    private getArcRadius(index: number): number {
        return (this._radius - this.thickness) - (index * (this.thickness + this.spacing));
    }

    /**
     * Map the dataset to the NestedDonutChartArc interface
     */
    private getChartData(): NestedDonutChartArc[] {
        const dataset = this.dataset.map((data, index) => {

            let previousEndAngle: number = 0;

            // check if there was a previous dataset at this index
            if (this._arcData && this._arcData[index]) {
                previousEndAngle = this._arcData[index].endAngle;
            }

            return { ...data, index, startAngle: 0, endAngle: this.getAngle(data), previousEndAngle };
        });

        // store the latest processed arc data
        this._arcData = dataset;

        return dataset;
    }

    /** Convert the data value to radians */
    private getAngle(data: NestedDonutChartData): number {
        const fraction = data.value / this.max;
        const degrees = fraction * 360.0;
        return degrees * (Math.PI / 180);
    }

    /**
     * Get the color of the arc, this may be a CSS color value, the name of a color
     * from the color set or a ThemeColor object. We return this as a rgba color to
     * support the alpha channel
     */
    private getColor(color: string | ThemeColor): string {
        return ThemeColor.isInstanceOf(color) ? (color as ThemeColor).toRgba() : this._colorService.resolve(color as string);
    }

    /** If no track color is specified then default to a specific color based on the active colorset */
    private getTrackColor(): string {
        if (this.trackColor) {
            return this.getColor(this.trackColor);
        }

        // otherwise default to a color based on the colorset (note we can't use the Color enum from MF package)
        if (this._colorService.colorExists(Color.Grey6)) {
            return this.getColor(Color.Grey6);
        }

        if (this._colorService.colorExists('bright-gray')) {
            return this.getColor('bright-gray');
        }
    }

    /** Define the on hover event */
    private onArcMouseEnter(target: BaseType, data: NestedDonutChartData): void {

        // update the hover effect if it is enabled
        if (this.disableHover === false) {
            select(target).transition().duration(250).attr('opacity', 0.5);
        }

        // update the tooltip context
        this._tooltipContext = { ...data, color: this.getColor(data.color) };

        // update the tooltip visibility
        this._tooltipVisible = true;

        // run change detection to ensure the visibility is updated
        this._changeDetector.detectChanges();
    }

    /** Update the tooltip position on mouse move */
    private onArcMouseMove([x, y]: [number, number]): void {
        this._tooltipX = x;
        this._tooltipY = y - 2; // subtract 2 so that it appears slightly above the cursor

        // run change detection to update the element position
        this._changeDetector.detectChanges();
    }

    /** Define the on hover out event */
    private onArcMouseLeave(target: BaseType): void {

        // update the hover effect if it is enabled
        if (this.disableHover === false) {
            select(target).transition().duration(250).attr('opacity', 1);
        }

        // clear the tooltip context
        this._tooltipContext = null;

        // update the tooltip visibility
        this._tooltipVisible = false;

        // run change detection to ensure the visibility is updated
        this._changeDetector.detectChanges();
    }
}

export interface NestedDonutChartData {
    name: string;
    value: number;
    color: ThemeColor | string;
    data?: { [key: string]: any };
}

export interface NestedDonutChartArc extends NestedDonutChartData {
    index: number;
    startAngle: number;
    endAngle: number;
    previousEndAngle: number;
}
