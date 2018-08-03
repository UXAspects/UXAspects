/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter } from '@angular/core';
export class WizardStepComponent {
    constructor() {
        this.valid = true;
        this.visitedChange = new EventEmitter();
        this._active = false;
        this._visited = false;
    }
    /**
     * @return {?}
     */
    get visited() {
        return this._visited;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visited(value) {
        this._visited = value;
        this.visitedChange.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        // store the active state of the step
        this._active = value;
        // if the value is true then the step should also be marked as visited
        if (value === true) {
            this.visited = true;
        }
    }
    /**
     * @return {?}
     */
    get active() {
        return this._active;
    }
}
WizardStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-wizard-step',
                template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>"
            }] }
];
WizardStepComponent.propDecorators = {
    header: [{ type: Input }],
    valid: [{ type: Input }],
    visitedChange: [{ type: Input }],
    visited: [{ type: Input }]
};
function WizardStepComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    WizardStepComponent.prototype.header;
    /** @type {?} */
    WizardStepComponent.prototype.valid;
    /** @type {?} */
    WizardStepComponent.prototype.visitedChange;
    /** @type {?} */
    WizardStepComponent.prototype._active;
    /** @type {?} */
    WizardStepComponent.prototype._visited;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2l6YXJkL3dpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTS9ELE1BQU07O3FCQUd3QixJQUFJOzZCQUNMLElBQUksWUFBWSxFQUFXO3VCQUV6QixLQUFLO3dCQUNKLEtBQUs7Ozs7O0lBRWpDLElBQ0ksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3hCOzs7OztJQUVELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7O0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBYzs7UUFHckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O1FBR3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0tBQ0o7Ozs7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7O1lBcENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQiwyRkFBMkM7YUFDOUM7OztxQkFHSSxLQUFLO29CQUNMLEtBQUs7NEJBQ0wsS0FBSztzQkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtd2l6YXJkLXN0ZXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93aXphcmQtc3RlcC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV2l6YXJkU3RlcENvbXBvbmVudCB7XG4gICAgXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHZpc2l0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIF9hY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF92aXNpdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBcbiAgICBnZXQgdmlzaXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2l0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHZpc2l0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaXRlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZpc2l0ZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0IGFjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBcbiAgICAgICAgLy8gc3RvcmUgdGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGUgc3RlcFxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgdHJ1ZSB0aGVuIHRoZSBzdGVwIHNob3VsZCBhbHNvIGJlIG1hcmtlZCBhcyB2aXNpdGVkXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gICAgfVxuXG59Il19