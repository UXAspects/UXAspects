/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ SLIDER_CHART_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SliderChartNg1Component; }),
    multi: true
};
var SliderChartNg1Component = (function (_super) {
    tslib_1.__extends(SliderChartNg1Component, _super);
    function SliderChartNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'sliderChart', elementRef, injector) || this;
        _this.ngModelChange = new EventEmitter();
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    SliderChartNg1Component.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    SliderChartNg1Component.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    SliderChartNg1Component.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    SliderChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'slider-chart',
                    providers: [SLIDER_CHART_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SliderChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    SliderChartNg1Component.propDecorators = {
        "sliderOptions": [{ type: Input },],
        "ngModel": [{ type: Input },],
        "chartOptions": [{ type: Input },],
        "chartData": [{ type: Input },],
        "ngModelChange": [{ type: Output },],
    };
    return SliderChartNg1Component;
}(UpgradeComponent));
export { SliderChartNg1Component };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWNoYXJ0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9zbGlkZXItY2hhcnQvc2xpZGVyLWNoYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxxQkFBTSwyQkFBMkIsR0FBUTtJQUM1QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHVCQUF1QixFQUF2QixDQUF1QixDQUFDO0lBQ3RELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUFNMkMsbURBQWdCO0lBU3pELGlDQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFBdEQsWUFDSSxrQkFBTSxhQUFhLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUM3Qzs4QkFKNEMsSUFBSSxZQUFZLEVBQU87O0tBSW5FOzs7OztJQUVELDRDQUFVOzs7O0lBQVYsVUFBVyxHQUFRLEtBQVc7Ozs7O0lBRTlCLGtEQUFnQjs7OztJQUFoQixVQUFpQixFQUFPLEtBQVc7Ozs7O0lBRW5DLG1EQUFpQjs7OztJQUFqQixVQUFrQixFQUFPLEtBQVc7O2dCQXJCdkMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztpQkFDM0M7Ozs7Z0JBYm1CLFVBQVU7Z0JBQUUsUUFBUTs7O2tDQWdCbkMsS0FBSzs0QkFDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FFTCxNQUFNOztrQ0FyQlg7RUFjNkMsZ0JBQWdCO1NBQWhELHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFNMSURFUl9DSEFSVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNsaWRlckNoYXJ0TmcxQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdzbGlkZXItY2hhcnQnLFxuICAgIHByb3ZpZGVyczogW1NMSURFUl9DSEFSVF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyQ2hhcnROZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgc2xpZGVyT3B0aW9uczogYW55O1xuICAgIEBJbnB1dCgpIG5nTW9kZWw6IGFueTtcbiAgICBASW5wdXQoKSBjaGFydE9wdGlvbnM6IGFueTtcbiAgICBASW5wdXQoKSBjaGFydERhdGE6IGFueTtcblxuICAgIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdzbGlkZXJDaGFydCcsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7IH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQgeyB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cbn0iXX0=