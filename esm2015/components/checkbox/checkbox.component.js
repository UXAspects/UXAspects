/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};
let /** @type {?} */ uniqueCheckboxId = 0;
export class CheckboxComponent {
    constructor() {
        this._checkboxId = `ux-checkbox-${++uniqueCheckboxId}`;
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
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
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
    }
    /**
     * @return {?}
     */
    get inputId() {
        return `${this.id || this._checkboxId}-input`;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.disabled || !this.clickable) {
            return;
        }
        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-checkbox',
                template: `<label [attr.for]="inputId"
       class="ux-checkbox"
       [class.ux-checkbox-checked]="value === true"
       [class.ux-checkbox-indeterminate]="indeterminate"
       [class.ux-checkbox-simplified]="simplified"
       [class.ux-checkbox-disabled]="disabled"
       [class.ux-checkbox-focused]="focused">

    <div class="ux-checkbox-container">
        <input type="checkbox"
               class="ux-checkbox-input"
               [id]="inputId"
               [required]="required"
               [checked]="value"
               [attr.value]="value"
               [disabled]="disabled"
               [attr.name]="name"
               [tabindex]="tabindex"
               [indeterminate]="indeterminate"
               [attr.aria-label]="ariaLabel"
               [attr.aria-labelledby]="ariaLabelledby"
               [attr.aria-checked]="ariaChecked"
               (focus)="focused = true"
               (blur)="focused = false"
               (change)="$event.stopPropagation()"
               (click)="toggle()">
    </div>

    <span class="ux-checkbox-label">
        <ng-content></ng-content>
    </span>
</label>
`,
                providers: [CHECKBOX_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
CheckboxComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLHFCQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQXVDekIsTUFBTTs7MkJBRTRCLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRTtrQkFFM0MsSUFBSSxDQUFDLFdBQVc7d0JBR1YsQ0FBQzt5QkFDQyxJQUFJOzBCQUNILEtBQUs7a0NBQ0QsQ0FBQyxDQUFDO3dCQUNSLEtBQUs7eUJBQ08sRUFBRTs4QkFDUSxJQUFJOzJCQUVaLElBQUksWUFBWSxFQUFPO3NCQTRCNUMsS0FBSzs2QkFFRixLQUFLO3VCQUVYLEtBQUs7aUNBRVEsU0FBUztnQ0FDSixTQUFTOzs7OztRQWhDMUMsS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFHdkIsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7UUFHcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzs7UUFHN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOztRQUc5RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLFFBQVEsQ0FBQztLQUNqRDs7OztJQVdELE1BQU07UUFFRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUI7Ozs7O0lBSUQsVUFBVSxDQUFDLEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0tBQ0o7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztLQUMvQjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7O1lBMUhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWdDYjtnQkFDRyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2Qzs7Ozs7bUJBS0ksS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7bUNBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUssU0FBQyxZQUFZOytCQUNsQixLQUFLLFNBQUMsaUJBQWlCOzRCQUV2QixNQUFNO3NCQUVOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmxldCB1bmlxdWVDaGVja2JveElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1jaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGA8bGFiZWwgW2F0dHIuZm9yXT1cImlucHV0SWRcIlxuICAgICAgIGNsYXNzPVwidXgtY2hlY2tib3hcIlxuICAgICAgIFtjbGFzcy51eC1jaGVja2JveC1jaGVja2VkXT1cInZhbHVlID09PSB0cnVlXCJcbiAgICAgICBbY2xhc3MudXgtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV09XCJpbmRldGVybWluYXRlXCJcbiAgICAgICBbY2xhc3MudXgtY2hlY2tib3gtc2ltcGxpZmllZF09XCJzaW1wbGlmaWVkXCJcbiAgICAgICBbY2xhc3MudXgtY2hlY2tib3gtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFtjbGFzcy51eC1jaGVja2JveC1mb2N1c2VkXT1cImZvY3VzZWRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ1eC1jaGVja2JveC1jb250YWluZXJcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICBjbGFzcz1cInV4LWNoZWNrYm94LWlucHV0XCJcbiAgICAgICAgICAgICAgIFtpZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAgICBbY2hlY2tlZF09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICBbaW5kZXRlcm1pbmF0ZV09XCJpbmRldGVybWluYXRlXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieVwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiYXJpYUNoZWNrZWRcIlxuICAgICAgICAgICAgICAgKGZvY3VzKT1cImZvY3VzZWQgPSB0cnVlXCJcbiAgICAgICAgICAgICAgIChibHVyKT1cImZvY3VzZWQgPSBmYWxzZVwiXG4gICAgICAgICAgICAgICAoY2hhbmdlKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKClcIj5cbiAgICA8L2Rpdj5cblxuICAgIDxzcGFuIGNsYXNzPVwidXgtY2hlY2tib3gtbGFiZWxcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbjwvbGFiZWw+XG5gLFxuICAgIHByb3ZpZGVyczogW0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIHByaXZhdGUgX2NoZWNrYm94SWQ6IHN0cmluZyA9IGB1eC1jaGVja2JveC0keysrdW5pcXVlQ2hlY2tib3hJZH1gO1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX2NoZWNrYm94SWQ7XG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBjbGlja2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNpbXBsaWZpZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpbmRldGVybWluYXRlVmFsdWU6IGFueSA9IC0xO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2FyaWEtbGFiZWxsZWRieScpIGFyaWFMYWJlbGxlZGJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiBpdCBpcyBpbiB0aGUgaW5kZXRlcm1pbmF0ZSBzdGF0ZVxuICAgICAgICB0aGlzLmluZGV0ZXJtaW5hdGUgPSB0aGlzLl92YWx1ZSA9PT0gdGhpcy5pbmRldGVybWluYXRlVmFsdWU7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBjaGVja2VkIHN0YXRlXG4gICAgICAgIHRoaXMuYXJpYUNoZWNrZWQgPSB0aGlzLmluZGV0ZXJtaW5hdGUgPyAnbWl4ZWQnIDogdGhpcy5fdmFsdWU7XG5cbiAgICAgICAgLy8gaW52b2tlIGNoYW5nZSBldmVudFxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuXG4gICAgICAgIC8vIGNhbGwgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dElkKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLl9jaGVja2JveElkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IGZhbHNlO1xuXG4gICAgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFyaWFDaGVja2VkOiBib29sZWFuIHwgc3RyaW5nO1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICAgIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdGhpcy5pbmRldGVybWluYXRlVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xlIHRoZSBjaGVja2VkIHN0YXRlXG4gICAgICAgIHRoaXMudmFsdWUgPSAhdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBGdW5jdGlvbnMgcmVxdWlyZWQgdG8gdXBkYXRlIG5nTW9kZWxcblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG59XG4iXX0=