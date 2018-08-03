/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter } from '@angular/core';
var WizardStepComponent = /** @class */ (function () {
    function WizardStepComponent() {
        this.valid = true;
        this.visitedChange = new EventEmitter();
        this._active = false;
        this._visited = false;
    }
    Object.defineProperty(WizardStepComponent.prototype, "visited", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visited;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._visited = value;
            this.visitedChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this._active;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // store the active state of the step
            this._active = value;
            // if the value is true then the step should also be marked as visited
            if (value === true) {
                this.visited = true;
            }
        },
        enumerable: true,
        configurable: true
    });
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
    return WizardStepComponent;
}());
export { WizardStepComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2l6YXJkL3dpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7cUJBU2pDLElBQUk7NkJBQ0wsSUFBSSxZQUFZLEVBQVc7dUJBRXpCLEtBQUs7d0JBQ0osS0FBSzs7SUFFakMsc0JBQ0ksd0NBQU87Ozs7UUFEWDtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hCOzs7OztRQUVELFVBQVksS0FBYztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQzs7O09BTEE7SUFPRCxzQkFBSSx1Q0FBTTs7OztRQVdWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7Ozs7O1FBYkQsVUFBVyxLQUFjOztZQUdyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7WUFHckIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0o7OztPQUFBOztnQkFoQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDJGQUEyQztpQkFDOUM7Ozt5QkFHSSxLQUFLO3dCQUNMLEtBQUs7Z0NBQ0wsS0FBSzswQkFLTCxLQUFLOzs4QkFmVjs7U0FNYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC13aXphcmQtc3RlcCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC1zdGVwLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRTdGVwQ29tcG9uZW50IHtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSB2YWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdmlzaXRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX2FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3Zpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIFxuICAgIGdldCB2aXNpdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaXRlZDtcbiAgICB9XG5cbiAgICBzZXQgdmlzaXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmlzaXRlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBzdG9yZSB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBzdGVwXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyB0cnVlIHRoZW4gdGhlIHN0ZXAgc2hvdWxkIGFsc28gYmUgbWFya2VkIGFzIHZpc2l0ZWRcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgICB9XG5cbn0iXX0=