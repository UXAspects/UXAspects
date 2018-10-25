/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, EventEmitter, HostBinding } from '@angular/core';
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
    /** @type {?} */
    WizardStepComponent.prototype.id;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2l6YXJkL3dpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFRLFdBQVcsRUFBc0IsTUFBTSxlQUFlLENBQUM7OztxQkFheEUsSUFBSTs2QkFDTCxJQUFJLFlBQVksRUFBVzt1QkFFekIsS0FBSzt3QkFDSixLQUFLOztJQUVqQyxzQkFDSSx3Q0FBTzs7OztRQURYO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7Ozs7O1FBRUQsVUFBWSxLQUFjO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDOzs7T0FMQTtJQU9ELHNCQUFJLHVDQUFNOzs7O1FBV1Y7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2Qjs7Ozs7UUFkRCxVQUFXLEtBQWM7O1lBR3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztZQUdyQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDdkI7U0FDSjs7O09BQUE7O2dCQXBDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsMkZBQTJDO29CQUMzQyxJQUFJLEVBQUU7d0JBQ0YsTUFBTSxFQUFFLFVBQVU7d0JBQ2xCLHdCQUF3QixFQUFFLGVBQWU7cUJBQzVDO2lCQUNKOzs7eUJBR0ksS0FBSzt3QkFDTCxLQUFLO2dDQUNMLEtBQUs7MEJBS0wsS0FBSzt5QkFxQkwsV0FBVyxTQUFDLG9CQUFvQjtxQkFLaEMsV0FBVyxTQUFDLElBQUk7OzhCQTdDckI7O1NBVWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0LCBIb3N0QmluZGluZywgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtd2l6YXJkLXN0ZXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93aXphcmQtc3RlcC5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAncm9sZSc6ICd0YWJwYW5lbCcsXG4gICAgICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2lkICsgXCItbGFiZWxcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFdpemFyZFN0ZXBDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHZpc2l0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIF9hY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF92aXNpdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2aXNpdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaXRlZDtcbiAgICB9XG5cbiAgICBzZXQgdmlzaXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmlzaXRlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGFjdGl2ZSBzdGF0ZSBvZiB0aGUgc3RlcFxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgdHJ1ZSB0aGVuIHRoZSBzdGVwIHNob3VsZCBhbHNvIGJlIG1hcmtlZCBhcyB2aXNpdGVkXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnaWQnKSBpZDogc3RyaW5nO1xufSJdfQ==