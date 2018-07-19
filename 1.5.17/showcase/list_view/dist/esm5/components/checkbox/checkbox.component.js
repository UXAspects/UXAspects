/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var /** @type {?} */ uniqueCheckboxId = 0;
var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this._checkboxId = "ux-checkbox-" + ++uniqueCheckboxId;
        this.id = this._checkboxId;
        this.tabindex = 0;
        this.clickable = true;
        this.simplified = false;
        this.indeterminateValue = -1;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.indeterminate = false;
        this.focused = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(CheckboxComponent.prototype, "value", {
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
            // determine if it is in the indeterminate state
            this.indeterminate = this._value === this.indeterminateValue;
            // determine the checked state
            this.ariaChecked = this.indeterminate ? 'mixed' : this._value;
            // invoke change event
            this.valueChange.emit(this._value);
            // call callback
            this.onChangeCallback(this._value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckboxComponent.prototype, "inputId", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.id || this._checkboxId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CheckboxComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        if (this.disabled || !this.clickable) {
            return;
        }
        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    };
    // Functions required to update ngModel
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxComponent.prototype.writeValue = /**
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
    CheckboxComponent.prototype.registerOnChange = /**
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
    CheckboxComponent.prototype.registerOnTouched = /**
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
    CheckboxComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    CheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-checkbox',
                    template: "<label [attr.for]=\"inputId\"\n       class=\"ux-checkbox\"\n       [class.ux-checkbox-checked]=\"value === true\"\n       [class.ux-checkbox-indeterminate]=\"indeterminate\"\n       [class.ux-checkbox-simplified]=\"simplified\"\n       [class.ux-checkbox-disabled]=\"disabled\"\n       [class.ux-checkbox-focused]=\"focused\">\n\n    <div class=\"ux-checkbox-container\">\n        <input type=\"checkbox\"\n               class=\"ux-checkbox-input\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"value\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabindex]=\"tabindex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"ariaChecked\"\n               (focus)=\"focused = true\"\n               (blur)=\"focused = false\"\n               (change)=\"$event.stopPropagation()\"\n               (click)=\"toggle()\">\n    </div>\n\n    <span class=\"ux-checkbox-label\">\n        <ng-content></ng-content>\n    </span>\n</label>\n",
                    providers: [CHECKBOX_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return []; };
    CheckboxComponent.propDecorators = {
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "required": [{ type: Input },],
        "tabindex": [{ type: Input },],
        "clickable": [{ type: Input },],
        "simplified": [{ type: Input },],
        "indeterminateValue": [{ type: Input },],
        "disabled": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input },],
    };
    return CheckboxComponent;
}());
export { CheckboxComponent };
function CheckboxComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CheckboxComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CheckboxComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CheckboxComponent.propDecorators;
    /** @type {?} */
    CheckboxComponent.prototype._checkboxId;
    /** @type {?} */
    CheckboxComponent.prototype.id;
    /** @type {?} */
    CheckboxComponent.prototype.name;
    /** @type {?} */
    CheckboxComponent.prototype.required;
    /** @type {?} */
    CheckboxComponent.prototype.tabindex;
    /** @type {?} */
    CheckboxComponent.prototype.clickable;
    /** @type {?} */
    CheckboxComponent.prototype.simplified;
    /** @type {?} */
    CheckboxComponent.prototype.indeterminateValue;
    /** @type {?} */
    CheckboxComponent.prototype.disabled;
    /** @type {?} */
    CheckboxComponent.prototype.ariaLabel;
    /** @type {?} */
    CheckboxComponent.prototype.ariaLabelledby;
    /** @type {?} */
    CheckboxComponent.prototype.valueChange;
    /** @type {?} */
    CheckboxComponent.prototype._value;
    /** @type {?} */
    CheckboxComponent.prototype.indeterminate;
    /** @type {?} */
    CheckboxComponent.prototype.ariaChecked;
    /** @type {?} */
    CheckboxComponent.prototype.focused;
    /** @type {?} */
    CheckboxComponent.prototype.onTouchedCallback;
    /** @type {?} */
    CheckboxComponent.prototype.onChangeCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHFCQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYscUJBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDOzs7MkJBeUNTLGlCQUFlLEVBQUUsZ0JBQWtCO2tCQUUzQyxJQUFJLENBQUMsV0FBVzt3QkFHVixDQUFDO3lCQUNDLElBQUk7MEJBQ0gsS0FBSztrQ0FDRCxDQUFDLENBQUM7d0JBQ1IsS0FBSzt5QkFDTyxFQUFFOzhCQUNRLElBQUk7MkJBRVosSUFBSSxZQUFZLEVBQU87c0JBNEI1QyxLQUFLOzZCQUVGLEtBQUs7dUJBRVgsS0FBSztpQ0FFUSxlQUFTO2dDQUNKLGVBQVM7OzBCQWhDMUMsb0NBQUs7Ozs7O1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7OztRQUd2QixVQUFVLEtBQVU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1lBR3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUM7O1lBRzdELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7WUFHOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUduQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCOzs7O0lBRUQsc0JBQUksc0NBQU87Ozs7UUFBWDtZQUNJLE1BQU0sQ0FBQyxDQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsWUFBUSxDQUFDO1NBQ2pEOzs7T0FBQTs7OztJQVdELGtDQUFNOzs7SUFBTjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtJQUVELHVDQUF1Qzs7Ozs7SUFFdkMsc0NBQVU7Ozs7SUFBVixVQUFXLEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0tBQ0o7Ozs7O0lBRUQsNENBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELDRDQUFnQjs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7Z0JBMUhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGlzQ0FnQ2I7b0JBQ0csU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ3ZDOzs7Ozt1QkFLSSxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzt1Q0FDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSyxTQUFDLFlBQVk7bUNBQ2xCLEtBQUssU0FBQyxpQkFBaUI7Z0NBRXZCLE1BQU07MEJBRU4sS0FBSzs7NEJBakVWOztTQWdEYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmxldCB1bmlxdWVDaGVja2JveElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1jaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGA8bGFiZWwgW2F0dHIuZm9yXT1cImlucHV0SWRcIlxuICAgICAgIGNsYXNzPVwidXgtY2hlY2tib3hcIlxuICAgICAgIFtjbGFzcy51eC1jaGVja2JveC1jaGVja2VkXT1cInZhbHVlID09PSB0cnVlXCJcbiAgICAgICBbY2xhc3MudXgtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV09XCJpbmRldGVybWluYXRlXCJcbiAgICAgICBbY2xhc3MudXgtY2hlY2tib3gtc2ltcGxpZmllZF09XCJzaW1wbGlmaWVkXCJcbiAgICAgICBbY2xhc3MudXgtY2hlY2tib3gtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFtjbGFzcy51eC1jaGVja2JveC1mb2N1c2VkXT1cImZvY3VzZWRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1jaGVja2JveC1jb250YWluZXJcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICBjbGFzcz1cInV4LWNoZWNrYm94LWlucHV0XCJcbiAgICAgICAgICAgICAgIFtpZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICBbY2hlY2tlZF09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJpbmRldGVybWluYXRlXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiYXJpYUNoZWNrZWRcIlxuICAgICAgICAgICAgICAgKGZvY3VzKT1cImZvY3VzZWQgPSB0cnVlXCJcbiAgICAgICAgICAgICAgIChibHVyKT1cImZvY3VzZWQgPSBmYWxzZVwiXG4gICAgICAgICAgICAgICAoY2hhbmdlKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKClcIj5cbiAgICA8L2Rpdj5cblxuICAgIDxzcGFuIGNsYXNzPVwidXgtY2hlY2tib3gtbGFiZWxcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbjwvbGFiZWw+XG5gLFxuICAgIHByb3ZpZGVyczogW0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIHByaXZhdGUgX2NoZWNrYm94SWQ6IHN0cmluZyA9IGB1eC1jaGVja2JveC0keysrdW5pcXVlQ2hlY2tib3hJZH1gO1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX2NoZWNrYm94SWQ7XG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBjbGlja2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNpbXBsaWZpZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpbmRldGVybWluYXRlVmFsdWU6IGFueSA9IC0xO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiBpdCBpcyBpbiB0aGUgaW5kZXRlcm1pbmF0ZSBzdGF0ZVxuICAgICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSB0aGlzLl92YWx1ZSA9PT0gdGhpcy5pbmRldGVybWluYXRlVmFsdWU7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBjaGVja2VkIHN0YXRlXG4gICAgICAgIHRoaXMuYXJpYUNoZWNrZWQgPSB0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogdGhpcy5fdmFsdWU7XG5cbiAgICAgICAgLy8gaW52b2tlIGNoYW5nZSBldmVudFxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuXG4gICAgICAgIC8vIGNhbGwgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dElkKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLl9jaGVja2JveElkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IGZhbHNlO1xuXG4gICAgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFyaWFDaGVja2VkOiBib29sZWFuIHwgc3RyaW5nO1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICAgIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdGhpcy5pbmRldGVybWluYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlIHRoZSBjaGVja2VkIHN0YXRlXG4gICAgICAgIHRoaXMudmFsdWUgPSAhdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBGdW5jdGlvbnMgcmVxdWlyZWQgdG8gdXBkYXRlIG5nTW9kZWxcblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG59XG4iXX0=