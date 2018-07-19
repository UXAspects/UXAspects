/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
var MarqueeWizardService = (function () {
    function MarqueeWizardService() {
        this.valid$ = new Subject();
    }
    MarqueeWizardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MarqueeWizardService.ctorParameters = function () { return []; };
    return MarqueeWizardService;
}());
export { MarqueeWizardService };
function MarqueeWizardService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarqueeWizardService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarqueeWizardService.ctorParameters;
    /** @type {?} */
    MarqueeWizardService.prototype.valid$;
}
/**
 * @record
 */
export function MarqueeWizardValidEvent() { }
function MarqueeWizardValidEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardValidEvent.prototype.step;
    /** @type {?} */
    MarqueeWizardValidEvent.prototype.valid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21hcnF1ZWUtd2l6YXJkL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O3NCQVcxQixJQUFJLE9BQU8sRUFBMkI7OztnQkFGbEQsVUFBVTs7OzsrQkFWWDs7U0FXYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC1zdGVwLmNvbXBvbmVudCc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGlzIHJlcXVpcmVkIHRvIHByb3ZpZGUgYSBmb3JtIG9mIGNvbW11bmljYXRpb25cbiAqIGJldHdlZW4gdGhlIG1hcnF1ZWUgd2l6YXJkIHN0ZXBzIGFuZCB0aGUgY29udGFpbmluZyBtYXJxdWVlIHdpemFyZC5cbiAqIFdlIGNhbm5vdCBpbmplY3QgdGhlIEhvc3QgZHVlIHRvIHRoZSBzdGVwcyBiZWluZyBjb250ZW50IGNoaWxkcmVuIFxuICogcmF0aGVyIHRoYW4gdmlldyBjaGlsZHJlbi5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcnF1ZWVXaXphcmRTZXJ2aWNlIHtcbiAgICB2YWxpZCQgPSBuZXcgU3ViamVjdDxNYXJxdWVlV2l6YXJkVmFsaWRFdmVudD4oKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXJxdWVlV2l6YXJkVmFsaWRFdmVudCB7XG4gICAgc3RlcDogTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQ7XG4gICAgdmFsaWQ6IGJvb2xlYW47XG59Il19