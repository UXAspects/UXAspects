import { AfterViewInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ColorService } from '../../services/color/index';
export declare class SliderComponent implements OnInit, AfterViewInit, DoCheck {
    private _changeDetectorRef;
    value: SliderValue | number;
    options: SliderOptions;
    valueChange: EventEmitter<SliderValue | number>;
    lowerTooltip: ElementRef;
    upperTooltip: ElementRef;
    track: ElementRef;
    private _value;
    sliderType: typeof SliderType;
    sliderStyle: typeof SliderStyle;
    sliderSize: typeof SliderSize;
    sliderSnap: typeof SliderSnap;
    sliderThumb: typeof SliderThumb;
    sliderTickType: typeof SliderTickType;
    sliderThumbEvent: typeof SliderThumbEvent;
    sliderCalloutTrigger: typeof SliderCalloutTrigger;
    tracks: {
        lower: {
            size: number;
            color: string;
        };
        middle: {
            size: number;
            color: string;
        };
        upper: {
            size: number;
            color: string;
        };
    };
    tooltips: {
        lower: {
            visible: boolean;
            position: number;
            label: string;
        };
        upper: {
            visible: boolean;
            position: number;
            label: string;
        };
    };
    thumbs: {
        lower: {
            hover: boolean;
            drag: boolean;
            position: number;
            order: number;
            value: number;
        };
        upper: {
            hover: boolean;
            drag: boolean;
            position: number;
            order: number;
            value: number;
        };
    };
    ticks: SliderTick[];
    defaultOptions: SliderOptions;
    constructor(colorService: ColorService, _changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    snapToNearestTick(thumb: SliderThumb, snapTarget: SliderSnap, forwards: boolean): void;
    snapToEnd(thumb: SliderThumb, forwards: boolean): void;
    getThumbValue(thumb: SliderThumb): number;
    getFormattedValue(thumb: SliderThumb): string | number;
    private getThumbState(thumb);
    private setThumbState(thumb, hover, drag);
    thumbEvent(thumb: SliderThumb, event: SliderThumbEvent): void;
    getAriaValueText(thumb: SliderThumb): string | number;
    private updateTooltips(thumb);
    private updateTooltipText(thumb);
    private getTooltipElement(thumb);
    private getTooltip(thumb);
    private updateTooltipPosition(thumb);
    private preventTooltipOverlap(tooltip);
    private clamp(value, min, max);
    updateThumbPosition(event: MouseEvent | TouchEvent, thumb: SliderThumb): void;
    private updateOrder(thumb);
    private getTickDistances(value, thumb, snapTarget);
    private snapToTick(value, thumb);
    private validateValue(thumb, value);
    private updateOptions();
    private updateValues();
    private setValue(low, high?);
    private setThumbValue(thumb, value);
    private updateTicks();
    private updateTrackColors();
    private getSteps(steps);
    private getTicks(options, type);
    private unionTicks(majorTicks, minorTicks);
    private deepMerge<T>(destination, source);
    private detectValueChange(value1, value2);
    /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param value - The object to check - this must be type any
     */
    private isSliderValue(value);
    private clone(value);
}
export declare enum SliderType {
    Value = 0,
    Range = 1,
}
export declare enum SliderStyle {
    Button = 0,
    Line = 1,
}
export declare enum SliderSize {
    Narrow = 0,
    Wide = 1,
}
export declare enum SliderCalloutTrigger {
    None = 0,
    Hover = 1,
    Drag = 2,
    Persistent = 3,
    Dynamic = 4,
}
export interface SliderValue {
    low: number;
    high: number;
}
export declare enum SliderSnap {
    None = 0,
    Minor = 1,
    Major = 2,
    All = 3,
}
export declare enum SliderTickType {
    Minor = 0,
    Major = 1,
}
export interface SliderOptions {
    type?: SliderType;
    handles?: SliderHandleOptions;
    track?: SliderTrackOptions;
}
export interface SliderHandleOptions {
    style?: SliderStyle;
    callout?: SliderCallout;
    keyboard?: SliderKeyboardOptions;
    aria?: SliderAriaOptions;
}
export interface SliderAriaOptions {
    thumb?: string;
    lowerThumb?: string;
    upperThumb?: string;
}
export interface SliderKeyboardOptions {
    major?: number;
    minor?: number;
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
export declare enum SliderThumbEvent {
    None = 0,
    MouseOver = 1,
    MouseLeave = 2,
    DragStart = 3,
    DragEnd = 4,
}
export declare enum SliderThumb {
    Lower = 0,
    Upper = 1,
}
