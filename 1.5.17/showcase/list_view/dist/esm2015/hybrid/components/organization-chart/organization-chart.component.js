/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class OrganizationChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxOrganizationChartNg1', elementRef, injector);
        this.dataChange = new EventEmitter();
        this.optionsChange = new EventEmitter();
    }
}
OrganizationChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'organization-chart'
            },] },
];
/** @nocollapse */
OrganizationChartNg1Component.ctorParameters = () => [
    { type: ElementRef, },
    { type: Injector, },
];
OrganizationChartNg1Component.propDecorators = {
    "data": [{ type: Input },],
    "options": [{ type: Input },],
    "dataChange": [{ type: Output },],
    "optionsChange": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJoeWJyaWQvY29tcG9uZW50cy9vcmdhbml6YXRpb24tY2hhcnQvb3JnYW5pemF0aW9uLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sb0NBQXFDLFNBQVEsZ0JBQWdCOzs7OztJQU8vRCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQzswQkFKbkMsSUFBSSxZQUFZLEVBQU87NkJBQ3BCLElBQUksWUFBWSxFQUFPO0tBSWhEOzs7WUFaSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQUxtQixVQUFVO1lBQUUsUUFBUTs7O3FCQVFuQyxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsTUFBTTs4QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGdyYWRlQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvdXBncmFkZS9zdGF0aWMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ29yZ2FuaXphdGlvbi1jaGFydCdcbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uQ2hhcnROZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRhdGE6IGFueTtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gICAgQE91dHB1dCgpIGRhdGFDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb3B0aW9uc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCd1eE9yZ2FuaXphdGlvbkNoYXJ0TmcxJywgZWxlbWVudFJlZiwgaW5qZWN0b3IpO1xuICAgIH1cbn0iXX0=