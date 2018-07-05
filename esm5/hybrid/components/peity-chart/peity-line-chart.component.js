/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var PeityLineChartNg1Component = (function (_super) {
    tslib_1.__extends(PeityLineChartNg1Component, _super);
    function PeityLineChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityLineChartNg1', elementRef, injector) || this;
    }
    PeityLineChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'line-chart'
                },] },
    ];
    /** @nocollapse */
    PeityLineChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    PeityLineChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
    };
    return PeityLineChartNg1Component;
}(UpgradeComponent));
export { PeityLineChartNg1Component };
function PeityLineChartNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PeityLineChartNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PeityLineChartNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PeityLineChartNg1Component.propDecorators;
    /** @type {?} */
    PeityLineChartNg1Component.prototype.data;
    /** @type {?} */
    PeityLineChartNg1Component.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVpdHktbGluZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiaHlicmlkL2NvbXBvbmVudHMvcGVpdHktY2hhcnQvcGVpdHktbGluZS1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUtYLHNEQUFnQjtJQUs1RCxvQ0FBWSxVQUFzQixFQUFFLFFBQWtCO2VBQ2xELGtCQUFNLHFCQUFxQixFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7S0FDckQ7O2dCQVZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtpQkFDekI7Ozs7Z0JBTG1CLFVBQVU7Z0JBQUUsUUFBUTs7O3lCQVFuQyxLQUFLOzRCQUNMLEtBQUs7O3FDQVRWO0VBTWdELGdCQUFnQjtTQUFuRCwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdsaW5lLWNoYXJ0J1xufSlcbmV4cG9ydCBjbGFzcyBQZWl0eUxpbmVDaGFydE5nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGF0YTogYW55O1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigndXhQZWl0eUxpbmVDaGFydE5nMScsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59Il19