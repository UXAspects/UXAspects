/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ SPIN_BUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SpinButtonComponent; }),
    multi: true
};
var SpinButtonComponent = (function () {
    function SpinButtonComponent() {
        this.type = 'text';
        this.placeholder = '';
        this.disabled = false;
        this.spinners = true;
        this.readOnly = true;
        this.scrolling = true;
        this.arrowkeys = true;
        this.valueChange = new EventEmitter();
        this.increment = new EventEmitter();
        this.decrement = new EventEmitter();
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(SpinButtonComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            this.onChangeCallback(value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    SpinButtonComponent.prototype.scroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.scrolling) {
            return;
        }
        if (event.deltaY > 0) {
            this.triggerDecrement();
        }
        else {
            this.triggerIncrement();
        }
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    SpinButtonComponent.prototype.triggerIncrement = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.increment.emit();
        }
    };
    /**
     * @return {?}
     */
    SpinButtonComponent.prototype.triggerDecrement = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.decrement.emit();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SpinButtonComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SpinButtonComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SpinButtonComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SpinButtonComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    SpinButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-spin-button',
                    template: "<button class=\"spin-button\"\n        *ngIf=\"spinners\"\n        tabindex=\"-1\"\n        [disabled]=\"disabled\"\n        [attr.aria-label]=\"incrementAriaLabel\"\n        [attr.aria-disabled]=\"disabled\"\n        (click)=\"triggerIncrement()\">\n\n  <span class=\"hpe-icon hpe-up\"></span>\n</button>\n\n<input [type]=\"type\"\n       role=\"spinbutton\"\n       [min]=\"min\"\n       [max]=\"max\"\n       [tabindex]=\"0\"\n       class=\"form-control\"\n       [placeholder]=\"placeholder\"\n       [readOnly]=\"readOnly\"\n       [disabled]=\"disabled\"\n       [attr.aria-label]=\"inputAriaLabel\"\n       [attr.aria-disabled]=\"disabled\"\n       [attr.aria-valuemin]=\"min\"\n       [attr.aria-valuenow]=\"value\"\n       [attr.aria-valuemax]=\"max\"\n       [attr.aria-readonly]=\"readOnly\"\n       [ngModel]=\"value\"\n       (ngModelChange)=\"valueChange.emit($event)\"\n       (wheel)=\"scroll($event)\"\n       (keydown.arrowup)=\"arrowkeys ? triggerIncrement() : null; $event.preventDefault()\"\n       (keydown.arrowdown)=\"arrowkeys ? triggerDecrement() : null; $event.preventDefault()\">\n\n<button class=\"spin-button\"\n        *ngIf=\"spinners\"\n        tabindex=\"-1\"\n        [disabled]=\"disabled\"\n        [attr.aria-label]=\"decrementAriaLabel\"\n        [attr.aria-disabled]=\"disabled\"\n        (click)=\"triggerDecrement()\">\n\n  <span class=\"hpe-icon hpe-down\"></span>\n</button>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [SPIN_BUTTON_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SpinButtonComponent.ctorParameters = function () { return []; };
    SpinButtonComponent.propDecorators = {
        "value": [{ type: Input },],
        "type": [{ type: Input },],
        "min": [{ type: Input },],
        "max": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "disabled": [{ type: Input },],
        "spinners": [{ type: Input },],
        "readOnly": [{ type: Input },],
        "scrolling": [{ type: Input },],
        "arrowkeys": [{ type: Input },],
        "incrementAriaLabel": [{ type: Input },],
        "inputAriaLabel": [{ type: Input },],
        "decrementAriaLabel": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "increment": [{ type: Output },],
        "decrement": [{ type: Output },],
    };
    return SpinButtonComponent;
}());
export { SpinButtonComponent };
function SpinButtonComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SpinButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SpinButtonComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SpinButtonComponent.propDecorators;
    /** @type {?} */
    SpinButtonComponent.prototype.type;
    /** @type {?} */
    SpinButtonComponent.prototype.min;
    /** @type {?} */
    SpinButtonComponent.prototype.max;
    /** @type {?} */
    SpinButtonComponent.prototype.placeholder;
    /** @type {?} */
    SpinButtonComponent.prototype.disabled;
    /** @type {?} */
    SpinButtonComponent.prototype.spinners;
    /** @type {?} */
    SpinButtonComponent.prototype.readOnly;
    /** @type {?} */
    SpinButtonComponent.prototype.scrolling;
    /** @type {?} */
    SpinButtonComponent.prototype.arrowkeys;
    /** @type {?} */
    SpinButtonComponent.prototype.incrementAriaLabel;
    /** @type {?} */
    SpinButtonComponent.prototype.inputAriaLabel;
    /** @type {?} */
    SpinButtonComponent.prototype.decrementAriaLabel;
    /** @type {?} */
    SpinButtonComponent.prototype.valueChange;
    /** @type {?} */
    SpinButtonComponent.prototype.increment;
    /** @type {?} */
    SpinButtonComponent.prototype.decrement;
    /** @type {?} */
    SpinButtonComponent.prototype.onTouchedCallback;
    /** @type {?} */
    SpinButtonComponent.prototype.onChangeCallback;
    /** @type {?} */
    SpinButtonComponent.prototype._value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bpbi1idXR0b24vc3Bpbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHFCQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDOzs7b0JBOEQwQixNQUFNOzJCQUdDLEVBQUU7d0JBQ0osS0FBSzt3QkFDTCxJQUFJO3dCQUNKLElBQUk7eUJBQ0gsSUFBSTt5QkFDSixJQUFJOzJCQU1WLElBQUksWUFBWSxFQUFPO3lCQUV6QixJQUFJLFlBQVksRUFBUTt5QkFDeEIsSUFBSSxZQUFZLEVBQVE7aUNBRWQsZUFBUztnQ0FDSixlQUFTOzswQkE5QmpDLHNDQUFLOzs7O1FBTWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7Ozs7O2tCQVJrQixLQUFVO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7Ozs7O0lBK0I3QixvQ0FBTTs7OztJQUFOLFVBQU8sS0FBaUI7UUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDMUI7Ozs7SUFFRCw4Q0FBZ0I7OztJQUFoQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtLQUNKOzs7O0lBRUQsOENBQWdCOzs7SUFBaEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7S0FDSjs7Ozs7SUFFRCx3Q0FBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN0Qjs7Ozs7SUFFRCw4Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBb0I7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCwrQ0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBYztRQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELDhDQUFnQjs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7Z0JBN0hKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsNjRDQXlDSjtvQkFDTixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUMxQzs7Ozs7MEJBR0ksS0FBSzt5QkFVTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztnQ0FDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzt1Q0FFTCxLQUFLO21DQUNMLEtBQUs7dUNBQ0wsS0FBSztnQ0FFTCxNQUFNOzhCQUVOLE1BQU07OEJBQ04sTUFBTTs7OEJBdEZYOztTQXlEYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBTUElOX0JVVFRPTl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNwaW5CdXR0b25Db21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNwaW4tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJzcGluLWJ1dHRvblwiXG4gICAgICAgICpuZ0lmPVwic3Bpbm5lcnNcIlxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbmNyZW1lbnRBcmlhTGFiZWxcIlxuICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgKGNsaWNrKT1cInRyaWdnZXJJbmNyZW1lbnQoKVwiPlxuXG4gIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLXVwXCI+PC9zcGFuPlxuPC9idXR0b24+XG5cbjxpbnB1dCBbdHlwZV09XCJ0eXBlXCJcbiAgICAgICByb2xlPVwic3BpbmJ1dHRvblwiXG4gICAgICAgW21pbl09XCJtaW5cIlxuICAgICAgIFttYXhdPVwibWF4XCJcbiAgICAgICBbdGFiaW5kZXhdPVwiMFwiXG4gICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgW3JlYWRPbmx5XT1cInJlYWRPbmx5XCJcbiAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW5wdXRBcmlhTGFiZWxcIlxuICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiXG4gICAgICAgW2F0dHIuYXJpYS1yZWFkb25seV09XCJyZWFkT25seVwiXG4gICAgICAgW25nTW9kZWxdPVwidmFsdWVcIlxuICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInZhbHVlQ2hhbmdlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgKHdoZWVsKT1cInNjcm9sbCgkZXZlbnQpXCJcbiAgICAgICAoa2V5ZG93bi5hcnJvd3VwKT1cImFycm93a2V5cyA/IHRyaWdnZXJJbmNyZW1lbnQoKSA6IG51bGw7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAoa2V5ZG93bi5hcnJvd2Rvd24pPVwiYXJyb3drZXlzID8gdHJpZ2dlckRlY3JlbWVudCgpIDogbnVsbDsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIj5cblxuPGJ1dHRvbiBjbGFzcz1cInNwaW4tYnV0dG9uXCJcbiAgICAgICAgKm5nSWY9XCJzcGlubmVyc1wiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImRlY3JlbWVudEFyaWFMYWJlbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAoY2xpY2spPVwidHJpZ2dlckRlY3JlbWVudCgpXCI+XG5cbiAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtZG93blwiPjwvc3Bhbj5cbjwvYnV0dG9uPmAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtTUElOX0JVVFRPTl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU3BpbkJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICd0ZXh0JztcbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNjcm9sbGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgYXJyb3drZXlzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGluY3JlbWVudEFyaWFMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGlucHV0QXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGVjcmVtZW50QXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBpbmNyZW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIGRlY3JlbWVudCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICAgIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gICAgc2Nyb2xsKGV2ZW50OiBXaGVlbEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRlY3JlbWVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VySW5jcmVtZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRyaWdnZXJJbmNyZW1lbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJpZ2dlckRlY3JlbWVudCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JlbWVudC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbn0iXX0=