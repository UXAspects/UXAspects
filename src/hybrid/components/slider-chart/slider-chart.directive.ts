import { Directive, ElementRef, Injector, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SLIDER_CHART_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderChartNg1Component),
    multi: true
};

@Directive({
    selector: 'slider-chart',
    providers: [SLIDER_CHART_VALUE_ACCESSOR]
})
export class SliderChartNg1Component extends UpgradeComponent implements ControlValueAccessor {

    @Input() sliderOptions: any;
    @Input() ngModel: any;
    @Input() chartOptions: any;
    @Input() chartData: any;

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('sliderChart', elementRef, injector);
    }

    writeValue(obj: any): void { }

    registerOnChange(fn: any): void { }

    registerOnTouched(fn: any): void { }
}