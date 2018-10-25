/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter, HostBinding } from '@angular/core';
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
                template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>",
                host: {
                    'role': 'tabpanel',
                    '[attr.aria-labelledby]': 'id + "-label"'
                }
            }] }
];
WizardStepComponent.propDecorators = {
    header: [{ type: Input }],
    valid: [{ type: Input }],
    visitedChange: [{ type: Input }],
    visited: [{ type: Input }],
    active: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    id: [{ type: HostBinding, args: ['id',] }]
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
    /** @type {?} */
    WizardStepComponent.prototype.id;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2l6YXJkL3dpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFRLFdBQVcsRUFBc0IsTUFBTSxlQUFlLENBQUM7QUFVdEcsTUFBTTs7cUJBR3dCLElBQUk7NkJBQ0wsSUFBSSxZQUFZLEVBQVc7dUJBRXpCLEtBQUs7d0JBQ0osS0FBSzs7Ozs7SUFFakMsSUFDSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7O0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFjOztRQUdyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7UUFHckIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDdkI7S0FDSjs7OztJQUVELElBQ0ksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3ZCOzs7WUF6Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDJGQUEyQztnQkFDM0MsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxVQUFVO29CQUNsQix3QkFBd0IsRUFBRSxlQUFlO2lCQUM1QzthQUNKOzs7cUJBR0ksS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7c0JBS0wsS0FBSztxQkFxQkwsV0FBVyxTQUFDLG9CQUFvQjtpQkFLaEMsV0FBVyxTQUFDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIsIEhvc3QsIEhvc3RCaW5kaW5nLCBJbmplY3QsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC13aXphcmQtc3RlcCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC1zdGVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnaWQgKyBcIi1sYWJlbFwiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgV2l6YXJkU3RlcENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSB2YWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdmlzaXRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX2FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3Zpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHZpc2l0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpdGVkO1xuICAgIH1cblxuICAgIHNldCB2aXNpdGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Zpc2l0ZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52aXNpdGVkQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBzdGVwXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyB0cnVlIHRoZW4gdGhlIHN0ZXAgc2hvdWxkIGFsc28gYmUgbWFya2VkIGFzIHZpc2l0ZWRcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZXhwYW5kZWQnKVxuICAgIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdpZCcpIGlkOiBzdHJpbmc7XG59Il19