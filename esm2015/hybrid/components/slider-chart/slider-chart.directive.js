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
            },] }
];
/** @nocollapse */
SliderChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SliderChartNg1Component.propDecorators = {
    sliderOptions: [{ type: Input }],
    ngModel: [{ type: Input }],
    chartOptions: [{ type: Input }],
    chartData: [{ type: Input }],
    ngModelChange: [{ type: Output }]
};
function SliderChartNg1Component_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWNoYXJ0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zbGlkZXItY2hhcnQvc2xpZGVyLWNoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLDJCQUEyQixHQUFRO0lBQzVDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFNRixNQUFNLDhCQUErQixTQUFRLGdCQUFnQjs7Ozs7SUFTekQsWUFBWSxVQUFzQixFQUFFLFFBQWtCO1FBQ2xELEtBQUssQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDOzZCQUhGLElBQUksWUFBWSxFQUFPO0tBSW5FOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFRLEtBQVc7Ozs7O0lBRTlCLGdCQUFnQixDQUFDLEVBQU8sS0FBVzs7Ozs7SUFFbkMsaUJBQWlCLENBQUMsRUFBTyxLQUFXOzs7WUFyQnZDLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDM0M7Ozs7WUFibUIsVUFBVTtZQUFFLFFBQVE7Ozs0QkFnQm5DLEtBQUs7c0JBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7NEJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFNMSURFUl9DSEFSVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNsaWRlckNoYXJ0TmcxQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdzbGlkZXItY2hhcnQnLFxuICAgIHByb3ZpZGVyczogW1NMSURFUl9DSEFSVF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyQ2hhcnROZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgc2xpZGVyT3B0aW9uczogYW55O1xuICAgIEBJbnB1dCgpIG5nTW9kZWw6IGFueTtcbiAgICBASW5wdXQoKSBjaGFydE9wdGlvbnM6IGFueTtcbiAgICBASW5wdXQoKSBjaGFydERhdGE6IGFueTtcblxuICAgIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdzbGlkZXJDaGFydCcsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7IH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQgeyB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cbn0iXX0=