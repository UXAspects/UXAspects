/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ SLIDER_CHART_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderChartNg1Component),
    multi: true
};
export class SliderChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('sliderChart', elementRef, injector);
        this.ngModelChange = new EventEmitter();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
}
SliderChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'slider-chart',
                providers: [SLIDER_CHART_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
SliderChartNg1Component.ctorParameters = () => [
    { type: ElementRef, },
    { type: Injector, },
];
SliderChartNg1Component.propDecorators = {
    "sliderOptions": [{ type: Input },],
    "ngModel": [{ type: Input },],
    "chartOptions": [{ type: Input },],
    "chartData": [{ type: Input },],
    "ngModelChange": [{ type: Output },],
};
function SliderChartNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SliderChartNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SliderChartNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SliderChartNg1Component.propDecorators;
    /** @type {?} */
    SliderChartNg1Component.prototype.sliderOptions;
    /** @type {?} */
    SliderChartNg1Component.prototype.ngModel;
    /** @type {?} */
    SliderChartNg1Component.prototype.chartOptions;
    /** @type {?} */
    SliderChartNg1Component.prototype.chartData;
    /** @type {?} */
    SliderChartNg1Component.prototype.ngModelChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWNoYXJ0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zbGlkZXItY2hhcnQvc2xpZGVyLWNoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLDJCQUEyQixHQUFRO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLHVCQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQU1GLE1BQU0sOEJBQStCLFNBQVEsZ0JBQWdCOzs7OztJQVN6RCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7NkJBSEYsSUFBSSxZQUFZLEVBQU87S0FJbkU7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVEsS0FBVzs7Ozs7SUFFOUIsZ0JBQWdCLENBQUMsRUFBTyxLQUFXOzs7OztJQUVuQyxpQkFBaUIsQ0FBQyxFQUFPLEtBQVc7OztZQXJCdkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUMzQzs7OztZQWJtQixVQUFVO1lBQUUsUUFBUTs7OzhCQWdCbkMsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgU0xJREVSX0NIQVJUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyQ2hhcnROZzFDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ3NsaWRlci1jaGFydCcsXG4gICAgcHJvdmlkZXJzOiBbU0xJREVSX0NIQVJUX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJDaGFydE5nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzbGlkZXJPcHRpb25zOiBhbnk7XG4gICAgQElucHV0KCkgbmdNb2RlbDogYW55O1xuICAgIEBJbnB1dCgpIGNoYXJ0T3B0aW9uczogYW55O1xuICAgIEBJbnB1dCgpIGNoYXJ0RGF0YTogYW55O1xuXG4gICAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ3NsaWRlckNoYXJ0JywgZWxlbWVudFJlZiwgaW5qZWN0b3IpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHsgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7IH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHsgfVxufSJdfQ==