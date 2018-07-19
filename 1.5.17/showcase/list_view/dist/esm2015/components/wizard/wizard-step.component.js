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
                template: `<ng-container *ngIf="active">
    <ng-content></ng-content>
</ng-container>`
            },] },
];
/** @nocollapse */
WizardStepComponent.ctorParameters = () => [];
WizardStepComponent.propDecorators = {
    "header": [{ type: Input },],
    "valid": [{ type: Input },],
    "visitedChange": [{ type: Input },],
    "visited": [{ type: Input },],
};
function WizardStepComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WizardStepComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WizardStepComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WizardStepComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2l6YXJkL3dpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUS9ELE1BQU07O3FCQUd3QixJQUFJOzZCQUNMLElBQUksWUFBWSxFQUFXO3VCQUV6QixLQUFLO3dCQUNKLEtBQUs7Ozs7O1FBRzdCLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0lBR3pCLElBQUksT0FBTyxDQUFDLEtBQWM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7O0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBYzs7UUFHckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O1FBR3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0tBQ0o7Ozs7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7O1lBdENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7O2dCQUVFO2FBQ2Y7Ozs7O3VCQUdJLEtBQUs7c0JBQ0wsS0FBSzs4QkFDTCxLQUFLO3dCQUtMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC13aXphcmQtc3RlcCcsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aXZlXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9uZy1jb250YWluZXI+YFxufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRTdGVwQ29tcG9uZW50IHtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSB2YWxpZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgdmlzaXRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX2FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3Zpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIFxuICAgIGdldCB2aXNpdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaXRlZDtcbiAgICB9XG5cbiAgICBzZXQgdmlzaXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmlzaXRlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBzdG9yZSB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBzdGVwXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyB0cnVlIHRoZW4gdGhlIHN0ZXAgc2hvdWxkIGFsc28gYmUgbWFya2VkIGFzIHZpc2l0ZWRcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgICB9XG5cbn0iXX0=