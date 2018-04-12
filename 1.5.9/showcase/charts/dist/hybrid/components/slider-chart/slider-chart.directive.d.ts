import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { ControlValueAccessor } from '@angular/forms';
export declare const SLIDER_CHART_VALUE_ACCESSOR: any;
export declare class SliderChartNg1Component extends UpgradeComponent implements ControlValueAccessor {
    sliderOptions: any;
    ngModel: any;
    chartOptions: any;
    chartData: any;
    ngModelChange: EventEmitter<any>;
    constructor(elementRef: ElementRef, injector: Injector);
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
