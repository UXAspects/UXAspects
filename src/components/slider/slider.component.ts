import { Component, Input, EventEmitter, Output, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit, OnDestroy, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { ColorService } from '../../services/color/index';

@Component({
    selector: 'ux-slider',
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

    @Input() value: SliderValue | number = 0;
    @Input() options: SliderOptions;
    @Output() valueChange: EventEmitter<SliderValue | number> = new EventEmitter<SliderValue | number>();

    @ViewChild('lowerThumb') lowerThumb: ElementRef;
    @ViewChild('lowerTooltip') lowerTooltip: ElementRef;
    @ViewChild('upperThumb') upperThumb: ElementRef;
    @ViewChild('upperTooltip') upperTooltip: ElementRef;
    @ViewChild('track') track: ElementRef;

    // store current values for deep change detection
    private _value: SliderValue | number;

    // expose enums to Angular view
    sliderType = SliderType;
    sliderStyle = SliderStyle;
    sliderSize = SliderSize;
    sliderThumb = SliderThumb;
    sliderTickType = SliderTickType;
    sliderThumbEvent = SliderThumbEvent;

    tracks = {
        lower: {
            size: 0,
            color: ''
        },
        middle: {
            size: 0,
            color: ''
        },
        upper: {
            size: 0,
            color: ''
        }
    };

    tooltips = {
        lower: {
            visible: false,
            position: 0,
            label: ''
        },
        upper: {
            visible: false,
            position: 0,
            label: ''
        }
    };

    thumbs = {
        lower: {
            hover: false,
            drag: false,
            position: 0,
            order: 100,
            value: null as number
        },
        upper: {
            hover: false,
            drag: false,
            position: 0,
            order: 101,
            value: null as number
        }
    };

    // store all the ticks to display
    ticks: SliderTick[] = [];
    defaultOptions: SliderOptions;

    // observables for capturing movement
    private _lowerThumbDown: Observable<MouseEvent>;
    private _upperThumbDown: Observable<MouseEvent>;
    private _mouseMove: Observable<MouseEvent> = Observable.fromEvent(document, 'mousemove');
    private _mouseUp: Observable<MouseEvent> = Observable.fromEvent(document, 'mouseup');
    private _lowerDrag: Subscription;
    private _upperDrag: Subscription;

    constructor(colorService: ColorService, private _changeDetectorRef: ChangeDetectorRef) {

        // setup default options
        this.defaultOptions = {
            type: SliderType.Value,
            handles: {
                style: SliderStyle.Button,
                callout: {
                    trigger: SliderCalloutTrigger.None,
                    background: colorService.getColor('grey2').toHex(),
                    color: '#fff',
                    formatter: (value: number): string | number => value
                }
            },
            track: {
                height: SliderSize.Wide,
                min: 0,
                max: 100,
                ticks: {
                    snap: SliderSnap.None,
                    major: {
                        show: true,
                        steps: 10,
                        labels: true,
                        formatter: (value: number): string | number => value
                    },
                    minor: {
                        show: true,
                        steps: 5,
                        labels: false,
                        formatter: (value: number): string | number => value
                    }
                },
                colors: {
                    lower: colorService.getColor('grey6').toHex(),
                    range: colorService.getColor('accent').setAlpha(0.75).toRgba(),
                    higher: colorService.getColor('grey6').toHex()
                }
            }
        };
    }

    ngOnInit() {

        // set up event observables
        this.initObservables();

        this.updateOptions();
        this.updateValues();

        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);

        // emit the initial value
        this.valueChange.next(this.clone(this.value));
    }

    ngDoCheck() {

        if (this.detectValueChange(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    }

    ngAfterViewInit() {
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(() => {
            this.updateTooltipPosition(SliderThumb.Lower);
            this.updateTooltipPosition(SliderThumb.Upper);

            // mark as dirty
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy() {
        this._lowerDrag.unsubscribe();
        this._upperDrag.unsubscribe();
    }

    getFormattedValue(thumb: SliderThumb): string | number {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    }

    private initObservables(): void {

        // when a user begins to drag lower thumb - subscribe to mouse move events until the mouse is lifted
        this._lowerThumbDown = Observable.fromEvent(this.lowerThumb.nativeElement, 'mousedown');

        this._lowerDrag = this._lowerThumbDown.switchMap(event => {
            event.preventDefault();
            return this._mouseMove.takeUntil(this._mouseUp);
        }).subscribe(event => {
            event.preventDefault();
            this.updateThumbPosition(event, SliderThumb.Lower);
        });

        // when a user begins to drag upper thumb - subscribe to mouse move events until the mouse is lifted
        this._upperThumbDown = Observable.fromEvent(this.upperThumb.nativeElement, 'mousedown');
        this._upperDrag = this._upperThumbDown.switchMap(event => {
            event.preventDefault();
            return this._mouseMove.takeUntil(this._mouseUp);
        }).subscribe(event => {
            event.preventDefault();
            this.updateThumbPosition(event, SliderThumb.Upper);
        });
    }

    private getThumbState(thumb: SliderThumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    }

    private setThumbState(thumb: SliderThumb, hover: boolean, drag: boolean) {
        if (thumb === SliderThumb.Lower) {
            this.thumbs.lower.hover = hover;
            this.thumbs.lower.drag = drag;
        } else {
            this.thumbs.upper.hover = hover;
            this.thumbs.upper.drag = drag;
        }

        // update the visibility of the tooltips
        this.updateTooltips(thumb);
    }

    @HostListener('document:mouseup', [])
    private onDragEnd() {
        // update thumb state here as we are not dragging any more
        this.thumbEvent(SliderThumb.Lower, SliderThumbEvent.DragEnd);
        this.thumbEvent(SliderThumb.Upper, SliderThumbEvent.DragEnd);
    }

    thumbEvent(thumb: SliderThumb, event: SliderThumbEvent): void {

        // get the current thumb state
        let state = this.getThumbState(thumb);

        // update based upon event
        switch (event) {

            case SliderThumbEvent.DragStart:
                state.drag = true;
                break;

            case SliderThumbEvent.DragEnd:
                state.drag = false;
                break;

            case SliderThumbEvent.MouseOver:
                state.hover = true;
                break;

            case SliderThumbEvent.MouseLeave:
                state.hover = false;
                break;

            case SliderThumbEvent.None:
                state.drag = false;
                state.hover = false;
                break;
        }

        // update the thumb state
        this.setThumbState(thumb, state.hover, state.drag);
    }

    private updateTooltips(thumb: SliderThumb): void {

        let visible = false;
        let state = this.getThumbState(thumb);

        switch (this.options.handles.callout.trigger) {

            case SliderCalloutTrigger.Persistent:
                visible = true;
                break;

            case SliderCalloutTrigger.Drag:
                visible = state.drag;
                break;

            case SliderCalloutTrigger.Hover:
                visible = state.hover || state.drag;
                break;
        }

        // update the state for the corresponding thumb
        this.getTooltip(thumb).visible = visible;

        // update the tooltip text
        this.updateTooltipText(thumb);

        // update the tooltip positions
        this.updateTooltipPosition(thumb);
    }

    private updateTooltipText(thumb: SliderThumb) {

        // get the thumb value
        let state = this.getThumbState(thumb);
        let tooltip = this.getTooltip(thumb);

        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    }

    private getThumbElement(thumb: SliderThumb): ElementRef {
        return thumb === SliderThumb.Lower ? this.lowerThumb : this.upperThumb;
    }

    private getTooltipElement(thumb: SliderThumb): ElementRef {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    }

    private getTooltip(thumb: SliderThumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    }

    private updateTooltipPosition(thumb: SliderThumb) {

        let tooltip = this.getTooltip(thumb);

        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }

        let tooltipElement = this.getTooltipElement(thumb);

        // get the element widths
        let thumbWidth: number;

        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        } else {
            thumbWidth = 2;
        }

        let tooltipWidth = tooltipElement.nativeElement.offsetWidth;

        // calculate the tooltips new position
        let tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);

        // update tooltip position
        tooltip.position = -tooltipPosition;
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    private updateThumbPosition(event: MouseEvent | TouchEvent, thumb: SliderThumb): void {

        // get event position - either mouse or touch
        let eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;

        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }

        // get mouse position
        let mouseX = window.pageXOffset + eventPosition;

        // get track size and position
        let trackBounds = this.track.nativeElement.getBoundingClientRect();

        // restrict the value within the range size
        let position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);

        // get fraction representation of location within the track
        let fraction = (position / trackBounds.width);

        // convert to value within the range
        let value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;

        // ensure value is valid
        value = this.validateValue(thumb, value);

        // snap to a tick if required
        value = this.snapToTick(value, thumb);

        // update the value accordingly
        this.setThumbValue(thumb, value);

        this.updateOrder(thumb);
        this.updateValues();

        // update tooltip text & position
        this.updateTooltipText(thumb);
        this.updateTooltipPosition(thumb);

        // mark as dirty for change detection
        this._changeDetectorRef.markForCheck();
    }

    private updateOrder(thumb: SliderThumb): void {

        let lower = thumb === SliderThumb.Lower ? 101 : 100;
        let upper = thumb === SliderThumb.Lower ? 100 : 101;

        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    }

    private snapToTick(value: number, thumb: SliderThumb): number {

        // get the snap target
        let snapTarget: SliderSnap = this.options.track.ticks.snap;

        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return value;
        }

        // get filtered ticks
        let ticks: SliderTick[];

        switch (snapTarget) {

            case SliderSnap.Minor:
                ticks = this.ticks.filter(tick => tick.type === SliderTickType.Minor);
                break;

            case SliderSnap.Major:
                ticks = this.ticks.filter(tick => tick.type === SliderTickType.Major);
                break;

            default:
                ticks = this.ticks.slice(0);
        }

        // get the track limit
        let lowerLimit = this.options.track.min;
        let upperLimit = this.options.track.max;

        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }

        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }

        // Find the closest tick to the current position
        let closest = ticks.filter(tick => tick.value >= lowerLimit && tick.value <= upperLimit)
            .reduceRight((previous, current) => {

                let previousDistance = Math.max(previous.value, value) - Math.min(previous.value, value);
                let currentDistance = Math.max(current.value, value) - Math.min(current.value, value);

                return previousDistance < currentDistance ? previous : current;
            });

        return closest.value;
    }

    private validateValue(thumb: SliderThumb, value: number): number {

        // if slider is not a range value is always valid
        if (this.options.type === SliderType.Value) {
            return value;
        }

        // check if value is with chart ranges
        if (value > this.options.track.max) {
            return this.options.track.max;
        }

        if (value < this.options.track.min) {
            return this.options.track.min;
        }

        // otherwise we need to check to make sure lower thumb cannot go above higher and vice versa
        if (thumb === SliderThumb.Lower) {

            if (this.thumbs.upper.value === null) {
                return value;
            }

            return value <= this.thumbs.upper.value ? value : this.thumbs.upper.value;
        }

        if (thumb === SliderThumb.Upper) {

            if (this.thumbs.lower.value === null) {
                return value;
            }

            return value >= this.thumbs.lower.value ? value : this.thumbs.lower.value;
        }
    }

    private updateOptions() {

        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);

        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    }

    private updateValues() {

        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }

        let lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        let upperValue = typeof this.value === 'number' ? this.value : this.value.high;

        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, Number(lowerValue.toFixed(4)));
        upperValue = this.validateValue(SliderThumb.Upper, Number(upperValue.toFixed(4)));

        // calculate the positions as percentages
        let lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        let upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);

        // update thumb positions
        this.thumbs.lower.position = lowerPosition;
        this.thumbs.upper.position = upperPosition;

        // calculate the track sizes
        this.tracks.lower.size = lowerPosition;
        this.tracks.middle.size = upperPosition - lowerPosition;
        this.tracks.upper.size = this.options.type === SliderType.Value ? 100 - lowerPosition : 100 - upperPosition;

        // update the value input
        this.setValue(lowerValue, upperValue);
    }

    private setValue(low: number, high?: number): void {

        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;

        let previousValue = this.clone(this._value);

        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };

        // call the event emitter if changes occured
        if (this.detectValueChange(this.value, previousValue)) {
            this.valueChange.emit(this.clone(this.value));

            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        } else {
            this.valueChange.emit(this.clone(this.value));
        }
    }

    private setThumbValue(thumb: SliderThumb, value: number) {

        // update the thumb value
        this.getThumbState(thumb).value = value;

        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    }

    private updateTicks() {

        // get tick options
        let majorOptions = this.options.track.ticks.major;
        let minorOptions = this.options.track.ticks.minor;

        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }

        // create ticks for both major and minor
        let majorTicks = this.getTicks(majorOptions, SliderTickType.Major);
        let minorTicks = this.getTicks(minorOptions, SliderTickType.Minor);

        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    }

    private updateTrackColors() {

        // get colors for each part of the track
        let lower = this.options.track.colors.lower;
        let range = this.options.track.colors.range;
        let higher = this.options.track.colors.higher;

        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : `linear-gradient(to right, ${lower.join(', ')})`;
        this.tracks.middle.color = typeof range === 'string' ? range : `linear-gradient(to right, ${range.join(', ')})`;
        this.tracks.upper.color = typeof higher === 'string' ? higher : `linear-gradient(to right, ${higher.join(', ')})`;
    }

    private getSteps(steps: number | number[]): number[] {

        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }

        let output: number[] = [];

        // otherwise calculate the steps
        for (let idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }

        return output;
    }

    private getTicks(options: SliderTickOptions, type: SliderTickType): SliderTick[] {

        // create an array to store the ticks and step points
        let steps = this.getSteps(options.steps);

        // get some chart options
        let min = this.options.track.min;
        let max = this.options.track.max;

        // convert each step to a slider tick and remove invalid ticks
        return steps.map(step => {
            return {
                showTicks: options.show,
                showLabels: options.labels,
                type: type,
                position: ((step - min) / (max - min)) * 100,
                value: step,
                label: options.formatter(step)
            };
        }).filter(tick => tick.position >= 0 && tick.position <= 100);
    }

    private unionTicks(majorTicks: SliderTick[], minorTicks: SliderTick[]): SliderTick[] {

        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter((tick, index, array) => tick.type === SliderTickType.Major || !array.find(tk => tk.type === SliderTickType.Major && tk.position === tick.position))
            .sort((t1, t2) => t1.value - t2.value);
    }

    private deepMerge(destination: any, source: any) {

        // loop though all of the properties in the source object
        for (let prop in source) {

            // check if the destination object has the property
            if (!destination.hasOwnProperty(prop)) {
                // copy the property across
                destination[prop] = source[prop];
                continue;
            }

            // if the property exists and is not an object then skip
            if (typeof destination[prop] !== 'object') {
                continue;
            }

            // check if property is an array
            if (destination[prop] instanceof Array) {
                continue;
            }

            // if it is an object then perform a recursive check
            destination[prop] = this.deepMerge(destination[prop], source[prop]);
        }

        return destination;
    }

    private detectValueChange(value1: number | SliderValue, value2: number | SliderValue): boolean {

        // compare two slider values
        if (this.isSliderValue(value1) && this.isSliderValue(value2)) {
            
            // references to the objects in the correct types
            const obj1 = value1 as SliderValue;
            const obj2 = value2 as SliderValue;
            
            return obj1.low !== obj2.low || obj1.high !== obj2.high;
        }

        // if not a slider value - should be number of nullable type - compare normally
        return value1 !== value2;
    }

    /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param value - The object to check - this must be type any
     */
    private isSliderValue(value: any): boolean {

        // check if is an object
        if (typeof value !== 'object') {
            return false;
        }

        // next check if it contains the necessary properties
        return 'low' in value && 'high' in value;
    }

    private clone(value: number | SliderValue): number | SliderValue {

        // if it is not an object simply return the value
        if (typeof value !== 'object') {
            return value;
        }

        // create a new object from the existing one
        const instance =  Object.assign({}, value);

        // delete remove the value from the old object
        value = undefined;

        // return the new instance of the object
        return instance;
    }
}

export enum SliderType {
    Value,
    Range
}

export enum SliderStyle {
    Button,
    Line
}

export enum SliderSize {
    Narrow,
    Wide
}

export enum SliderCalloutTrigger {
    None,
    Hover,
    Drag,
    Persistent
}

export interface SliderValue {
    low: number;
    high: number;
}

export enum SliderSnap {
    None,
    Minor,
    Major,
    All
}

export enum SliderTickType {
    Minor,
    Major
}

export interface SliderOptions {
    type?: SliderType;
    handles?: SliderHandleOptions;
    track?: SliderTrackOptions;
}

export interface SliderHandleOptions {
    style?: SliderStyle;
    callout?: SliderCallout;
}

export interface SliderTrackOptions {
    height?: SliderSize;
    min?: number;
    max?: number;
    ticks?: SliderTicksOptions;
    colors?: SliderTrackColors;
}

export interface SliderTicksOptions {
    snap?: SliderSnap;
    major?: SliderTickOptions;
    minor?: SliderTickOptions;
}

export interface SliderTickOptions {
    show?: boolean;
    steps?: number | number[];
    labels?: boolean;
    formatter?: (value: number) => string | number;
}

export interface SliderTick {
    showTicks: boolean;
    showLabels: boolean;
    type: SliderTickType;
    position: number;
    value: number;
    label: string | number;
}

export interface SliderTrackColors {
    lower?: string | string[];
    range?: string | string[];
    higher?: string | string[];
}

export interface SliderCallout {
    trigger?: SliderCalloutTrigger;
    background?: string;
    color?: string;
    formatter?: (value: number) => string | number;
}

export enum SliderThumbEvent {
    None,
    MouseOver,
    MouseLeave,
    DragStart,
    DragEnd
}

export enum SliderThumb {
    Lower,
    Upper
}