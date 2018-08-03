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
var MarqueeWizardService = /** @class */ (function () {
    function MarqueeWizardService() {
        this.valid$ = new Subject();
    }
    MarqueeWizardService.decorators = [
        { type: Injectable }
    ];
    return MarqueeWizardService;
}());
export { MarqueeWizardService };
function MarqueeWizardService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21hcnF1ZWUtd2l6YXJkL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7O3NCQVcxQixJQUFJLE9BQU8sRUFBMkI7OztnQkFGbEQsVUFBVTs7K0JBVlg7O1NBV2Esb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vbWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBpcyByZXF1aXJlZCB0byBwcm92aWRlIGEgZm9ybSBvZiBjb21tdW5pY2F0aW9uXG4gKiBiZXR3ZWVuIHRoZSBtYXJxdWVlIHdpemFyZCBzdGVwcyBhbmQgdGhlIGNvbnRhaW5pbmcgbWFycXVlZSB3aXphcmQuXG4gKiBXZSBjYW5ub3QgaW5qZWN0IHRoZSBIb3N0IGR1ZSB0byB0aGUgc3RlcHMgYmVpbmcgY29udGVudCBjaGlsZHJlbiBcbiAqIHJhdGhlciB0aGFuIHZpZXcgY2hpbGRyZW4uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJxdWVlV2l6YXJkU2VydmljZSB7XG4gICAgdmFsaWQkID0gbmV3IFN1YmplY3Q8TWFycXVlZVdpemFyZFZhbGlkRXZlbnQ+KCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFycXVlZVdpemFyZFZhbGlkRXZlbnQge1xuICAgIHN0ZXA6IE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50O1xuICAgIHZhbGlkOiBib29sZWFuO1xufSJdfQ==