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
export class MarqueeWizardService {
    constructor() {
        this.valid$ = new Subject();
    }
}
MarqueeWizardService.decorators = [
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21hcnF1ZWUtd2l6YXJkL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7OztBQVV2QyxNQUFNOztzQkFDTyxJQUFJLE9BQU8sRUFBMkI7Ozs7WUFGbEQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLXN0ZXAuY29tcG9uZW50JztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgaXMgcmVxdWlyZWQgdG8gcHJvdmlkZSBhIGZvcm0gb2YgY29tbXVuaWNhdGlvblxuICogYmV0d2VlbiB0aGUgbWFycXVlZSB3aXphcmQgc3RlcHMgYW5kIHRoZSBjb250YWluaW5nIG1hcnF1ZWUgd2l6YXJkLlxuICogV2UgY2Fubm90IGluamVjdCB0aGUgSG9zdCBkdWUgdG8gdGhlIHN0ZXBzIGJlaW5nIGNvbnRlbnQgY2hpbGRyZW4gXG4gKiByYXRoZXIgdGhhbiB2aWV3IGNoaWxkcmVuLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFycXVlZVdpemFyZFNlcnZpY2Uge1xuICAgIHZhbGlkJCA9IG5ldyBTdWJqZWN0PE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50PigpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50IHtcbiAgICBzdGVwOiBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudDtcbiAgICB2YWxpZDogYm9vbGVhbjtcbn0iXX0=