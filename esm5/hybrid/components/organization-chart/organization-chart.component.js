/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var OrganizationChartNg1Component = (function (_super) {
    tslib_1.__extends(OrganizationChartNg1Component, _super);
    function OrganizationChartNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'uxOrganizationChartNg1', elementRef, injector) || this;
        _this.dataChange = new EventEmitter();
        _this.optionsChange = new EventEmitter();
        return _this;
    }
    OrganizationChartNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'organization-chart'
                },] },
    ];
    /** @nocollapse */
    OrganizationChartNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    OrganizationChartNg1Component.propDecorators = {
        "data": [{ type: Input },],
        "options": [{ type: Input },],
        "dataChange": [{ type: Output },],
        "optionsChange": [{ type: Output },],
    };
    return OrganizationChartNg1Component;
}(UpgradeComponent));
export { OrganizationChartNg1Component };
function OrganizationChartNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    OrganizationChartNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    OrganizationChartNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    OrganizationChartNg1Component.propDecorators;
    /** @type {?} */
    OrganizationChartNg1Component.prototype.data;
    /** @type {?} */
    OrganizationChartNg1Component.prototype.options;
    /** @type {?} */
    OrganizationChartNg1Component.prototype.dataChange;
    /** @type {?} */
    OrganizationChartNg1Component.prototype.optionsChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9vcmdhbml6YXRpb24tY2hhcnQvb3JnYW5pemF0aW9uLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLUix5REFBZ0I7SUFPL0QsdUNBQVksVUFBc0IsRUFBRSxRQUFrQjtRQUF0RCxZQUNJLGtCQUFNLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FDeEQ7MkJBTHNCLElBQUksWUFBWSxFQUFPOzhCQUNwQixJQUFJLFlBQVksRUFBTzs7S0FJaEQ7O2dCQVpKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2lCQUNqQzs7OztnQkFMbUIsVUFBVTtnQkFBRSxRQUFROzs7eUJBUW5DLEtBQUs7NEJBQ0wsS0FBSzsrQkFDTCxNQUFNO2tDQUNOLE1BQU07O3dDQVhYO0VBTW1ELGdCQUFnQjtTQUF0RCw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnb3JnYW5pemF0aW9uLWNoYXJ0J1xufSlcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydE5nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGF0YTogYW55O1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcbiAgICBAT3V0cHV0KCkgZGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvcHRpb25zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ3V4T3JnYW5pemF0aW9uQ2hhcnROZzEnLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufSJdfQ==