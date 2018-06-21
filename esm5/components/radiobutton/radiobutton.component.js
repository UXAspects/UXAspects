/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ RADIOBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButtonComponent; }),
    multi: true
};
var /** @type {?} */ uniqueRadioId = 0;
var RadioButtonComponent = (function () {
    function RadioButtonComponent() {
        this._radioButtonId = "ux-radio-button-" + ++uniqueRadioId;
        this.id = this._radioButtonId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.simplified = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.ariaDescribedby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(RadioButtonComponent.prototype, "value", {
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
            // invoke change event
            this.valueChange.emit(this._value);
            // call callback
            this.onChangeCallback(this._value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._radioButtonId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RadioButtonComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (this.disabled || !this.clickable) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
    };
    // Functions required to update ng-model
    /**
     * @param {?} value
     * @return {?}
     */
    RadioButtonComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this._value) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioButtonComponent.prototype.registerOnChange = /**
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
    RadioButtonComponent.prototype.registerOnTouched = /**
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
    RadioButtonComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    RadioButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-radio-button',
                    template: "<label [attr.for]=\"inputId\" class=\"ux-radio-button\"\n       [class.ux-radio-button-checked]=\"value === option\"\n       [class.ux-radio-button-simplified]=\"simplified\"\n       [class.ux-radio-button-disabled]=\"disabled\"\n       [class.ux-radio-button-focused]=\"focused\">\n\n    <div class=\"ux-radio-button-container\">\n        <input class=\"ux-radio-button-input\"\n            type=\"radio\"\n            [id]=\"inputId\"\n            [checked]=\"value === option\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex || value === option ? 0 : -1\"\n            [attr.name]=\"name\"\n            [required]=\"required\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            [attr.aria-describedby]=\"ariaDescribedby\"\n            [attr.aria-checked]=\"value === option\"\n            (focus)=\"focused = true\"\n            (blur)=\"focused = false\"\n            (change)=\"toggle()\"\n            (click)=\"$event.stopPropagation()\">\n    </div>\n\n    <span class=\"ux-radio-button-label\">\n        <ng-content></ng-content>\n    </span>\n\n</label>",
                    providers: [RADIOBUTTON_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RadioButtonComponent.propDecorators = {
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "required": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "clickable": [{ type: Input },],
        "disabled": [{ type: Input },],
        "simplified": [{ type: Input },],
        "option": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "ariaDescribedby": [{ type: Input, args: ['aria-describedby',] },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input },],
    };
    return RadioButtonComponent;
}());
export { RadioButtonComponent };
function RadioButtonComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RadioButtonComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RadioButtonComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    RadioButtonComponent.propDecorators;
    /** @type {?} */
    RadioButtonComponent.prototype._radioButtonId;
    /** @type {?} */
    RadioButtonComponent.prototype.id;
    /** @type {?} */
    RadioButtonComponent.prototype.name;
    /** @type {?} */
    RadioButtonComponent.prototype.required;
    /** @type {?} */
    RadioButtonComponent.prototype.tabindex;
    /** @type {?} */
    RadioButtonComponent.prototype.clickable;
    /** @type {?} */
    RadioButtonComponent.prototype.disabled;
    /** @type {?} */
    RadioButtonComponent.prototype.simplified;
    /** @type {?} */
    RadioButtonComponent.prototype.option;
    /** @type {?} */
    RadioButtonComponent.prototype.ariaLabel;
    /** @type {?} */
    RadioButtonComponent.prototype.ariaLabelledby;
    /** @type {?} */
    RadioButtonComponent.prototype.ariaDescribedby;
    /** @type {?} */
    RadioButtonComponent.prototype.valueChange;
    /** @type {?} */
    RadioButtonComponent.prototype._value;
    /** @type {?} */
    RadioButtonComponent.prototype.focused;
    /** @type {?} */
    RadioButtonComponent.prototype.onTouchedCallback;
    /** @type {?} */
    RadioButtonComponent.prototype.onChangeCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcmFkaW9idXR0b24vcmFkaW9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHFCQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYscUJBQUksYUFBYSxHQUFHLENBQUMsQ0FBQzs7OzhCQXNDZSxxQkFBbUIsRUFBRSxhQUFlO2tCQUUvQyxJQUFJLENBQUMsY0FBYzt3QkFHYixDQUFDO3lCQUNDLElBQUk7d0JBQ0wsS0FBSzswQkFDSCxLQUFLO3lCQUVLLEVBQUU7OEJBQ1EsSUFBSTsrQkFDRixJQUFJOzJCQUVkLElBQUksWUFBWSxFQUFPO3NCQXNCNUMsS0FBSzt1QkFFUixLQUFLO2lDQUNRLGVBQVM7Z0NBQ0osZUFBUzs7MEJBdkIxQyx1Q0FBSzs7Ozs7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O1FBR3ZCLFVBQVUsS0FBYztZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7WUFHcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUduQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCOzs7O0lBRUQsc0JBQUkseUNBQU87Ozs7UUFBWDtZQUNJLE1BQU0sQ0FBQyxDQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsWUFBUSxDQUFDO1NBQ3BEOzs7T0FBQTs7OztJQVFELHFDQUFNOzs7SUFBTjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7O1FBR3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckM7SUFFRCx3Q0FBd0M7Ozs7O0lBQ3hDLHlDQUFVOzs7O0lBQVYsVUFBVyxLQUFjO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2QjtLQUNKOzs7OztJQUVELCtDQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsZ0RBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU87UUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCwrQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDOUI7O2dCQTVHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLCtuQ0E2Qkw7b0JBQ0wsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7aUJBQzFDOzs7O3VCQUtJLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLLFNBQUMsWUFBWTttQ0FDbEIsS0FBSyxTQUFDLGlCQUFpQjtvQ0FDdkIsS0FBSyxTQUFDLGtCQUFrQjtnQ0FFeEIsTUFBTTswQkFFTixLQUFLOzsrQkEvRFY7O1NBNkNhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBSQURJT0JVVFRPTl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxubGV0IHVuaXF1ZVJhZGlvSWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXJhZGlvLWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGA8bGFiZWwgW2F0dHIuZm9yXT1cImlucHV0SWRcIiBjbGFzcz1cInV4LXJhZGlvLWJ1dHRvblwiXG4gICAgICAgW2NsYXNzLnV4LXJhZGlvLWJ1dHRvbi1jaGVja2VkXT1cInZhbHVlID09PSBvcHRpb25cIlxuICAgICAgIFtjbGFzcy51eC1yYWRpby1idXR0b24tc2ltcGxpZmllZF09XCJzaW1wbGlmaWVkXCJcbiAgICAgICBbY2xhc3MudXgtcmFkaW8tYnV0dG9uLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICBbY2xhc3MudXgtcmFkaW8tYnV0dG9uLWZvY3VzZWRdPVwiZm9jdXNlZFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXJhZGlvLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwidXgtcmFkaW8tYnV0dG9uLWlucHV0XCJcbiAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICBbaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICBbY2hlY2tlZF09XCJ2YWx1ZSA9PT0gb3B0aW9uXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXggfHwgdmFsdWUgPT09IG9wdGlvbiA/IDAgOiAtMVwiXG4gICAgICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImFyaWFEZXNjcmliZWRieVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwidmFsdWUgPT09IG9wdGlvblwiXG4gICAgICAgICAgICAoZm9jdXMpPVwiZm9jdXNlZCA9IHRydWVcIlxuICAgICAgICAgICAgKGJsdXIpPVwiZm9jdXNlZCA9IGZhbHNlXCJcbiAgICAgICAgICAgIChjaGFuZ2UpPVwidG9nZ2xlKClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgIDwvZGl2PlxuXG4gICAgPHNwYW4gY2xhc3M9XCJ1eC1yYWRpby1idXR0b24tbGFiZWxcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cblxuPC9sYWJlbD5gLFxuICAgIHByb3ZpZGVyczogW1JBRElPQlVUVE9OX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0J1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIHByaXZhdGUgX3JhZGlvQnV0dG9uSWQ6IHN0cmluZyA9IGB1eC1yYWRpby1idXR0b24tJHsrK3VuaXF1ZVJhZGlvSWR9YDtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSB0aGlzLl9yYWRpb0J1dHRvbklkO1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGw7XG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNpbXBsaWZpZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBvcHRpb246IGFueTtcbiAgICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyA9IG51bGw7XG4gICAgQElucHV0KCdhcmlhLWRlc2NyaWJlZGJ5JykgYXJpYURlc2NyaWJlZGJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBpbnZva2UgY2hhbmdlIGV2ZW50XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG5cbiAgICAgICAgLy8gY2FsbCBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7ICAgICAgICBcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRJZCgpOiBzdHJpbmcgeyBcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuaWQgfHwgdGhpcy5fcmFkaW9CdXR0b25JZH0taW5wdXRgO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSBmYWxzZTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmNsaWNrYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlIHRoZSBjaGVja2VkIHN0YXRlXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wdGlvbjtcblxuICAgICAgICAvLyBjYWxsIGNhbGxiYWNrXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBGdW5jdGlvbnMgcmVxdWlyZWQgdG8gdXBkYXRlIG5nLW1vZGVsXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG59XG4iXX0=