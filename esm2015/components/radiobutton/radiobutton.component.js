/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ RADIOBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};
let /** @type {?} */ uniqueRadioId = 0;
export class RadioButtonComponent {
    constructor() {
        this._radioButtonId = `ux-radio-button-${++uniqueRadioId}`;
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
        return `${this.id || this._radioButtonId}-input`;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.disabled || !this.clickable) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
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
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-radio-button',
                template: `<label [attr.for]="inputId" class="ux-radio-button"
       [class.ux-radio-button-checked]="value === option"
       [class.ux-radio-button-simplified]="simplified"
       [class.ux-radio-button-disabled]="disabled"
       [class.ux-radio-button-focused]="focused">

    <div class="ux-radio-button-container">
        <input class="ux-radio-button-input"
            type="radio"
            [id]="inputId"
            [checked]="value === option"
            [disabled]="disabled"
            [tabindex]="tabindex || value === option ? 0 : -1"
            [attr.name]="name"
            [required]="required"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledby]="ariaLabelledby"
            [attr.aria-describedby]="ariaDescribedby"
            [attr.aria-checked]="value === option"
            (focus)="focused = true"
            (blur)="focused = false"
            (change)="toggle()"
            (click)="$event.stopPropagation()">
    </div>

    <span class="ux-radio-button-label">
        <ng-content></ng-content>
    </span>

</label>`,
                providers: [RADIOBUTTON_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
RadioButtonComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcmFkaW9idXR0b24vcmFkaW9idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLG9CQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLHFCQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFvQ3RCLE1BQU07OzhCQUUrQixtQkFBbUIsRUFBRSxhQUFhLEVBQUU7a0JBRS9DLElBQUksQ0FBQyxjQUFjO3dCQUdiLENBQUM7eUJBQ0MsSUFBSTt3QkFDTCxLQUFLOzBCQUNILEtBQUs7eUJBRUssRUFBRTs4QkFDUSxJQUFJOytCQUNGLElBQUk7MkJBRWQsSUFBSSxZQUFZLEVBQU87c0JBc0I1QyxLQUFLO3VCQUVSLEtBQUs7aUNBQ1EsU0FBUztnQ0FDSixTQUFTOzs7OztRQXZCMUMsS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFHdkIsSUFBSSxLQUFLLENBQUMsS0FBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7UUFHcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUduQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxRQUFRLENBQUM7S0FDcEQ7Ozs7SUFRRCxNQUFNO1FBRUYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFHekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFHRCxVQUFVLENBQUMsS0FBYztRQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7S0FDSjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQzlCOzs7WUE1R0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E2Qkw7Z0JBQ0wsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDMUM7Ozs7O21CQUtJLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLLFNBQUMsWUFBWTsrQkFDbEIsS0FBSyxTQUFDLGlCQUFpQjtnQ0FDdkIsS0FBSyxTQUFDLGtCQUFrQjs0QkFFeEIsTUFBTTtzQkFFTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFJBRElPQlVUVE9OX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b25Db21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5sZXQgdW5pcXVlUmFkaW9JZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcmFkaW8tYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYDxsYWJlbCBbYXR0ci5mb3JdPVwiaW5wdXRJZFwiIGNsYXNzPVwidXgtcmFkaW8tYnV0dG9uXCJcbiAgICAgICBbY2xhc3MudXgtcmFkaW8tYnV0dG9uLWNoZWNrZWRdPVwidmFsdWUgPT09IG9wdGlvblwiXG4gICAgICAgW2NsYXNzLnV4LXJhZGlvLWJ1dHRvbi1zaW1wbGlmaWVkXT1cInNpbXBsaWZpZWRcIlxuICAgICAgIFtjbGFzcy51eC1yYWRpby1idXR0b24tZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFtjbGFzcy51eC1yYWRpby1idXR0b24tZm9jdXNlZF09XCJmb2N1c2VkXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidXgtcmFkaW8tYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJ1eC1yYWRpby1idXR0b24taW5wdXRcIlxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIFtpZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgIFtjaGVja2VkXT1cInZhbHVlID09PSBvcHRpb25cIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleCB8fCB2YWx1ZSA9PT0gb3B0aW9uID8gMCA6IC0xXCJcbiAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZGJ5XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiYXJpYURlc2NyaWJlZGJ5XCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJ2YWx1ZSA9PT0gb3B0aW9uXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJmb2N1c2VkID0gdHJ1ZVwiXG4gICAgICAgICAgICAoYmx1cik9XCJmb2N1c2VkID0gZmFsc2VcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJ0b2dnbGUoKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgPC9kaXY+XG5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXJhZGlvLWJ1dHRvbi1sYWJlbFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuXG48L2xhYmVsPmAsXG4gICAgcHJvdmlkZXJzOiBbUkFESU9CVVRUT05fVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcHJpdmF0ZSBfcmFkaW9CdXR0b25JZDogc3RyaW5nID0gYHV4LXJhZGlvLWJ1dHRvbi0keysrdW5pcXVlUmFkaW9JZH1gO1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3JhZGlvQnV0dG9uSWQ7XG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICBASW5wdXQoKSBjbGlja2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2ltcGxpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIG9wdGlvbjogYW55O1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nID0gbnVsbDtcbiAgICBASW5wdXQoJ2FyaWEtZGVzY3JpYmVkYnknKSBhcmlhRGVzY3JpYmVkYnk6IHN0cmluZyA9IG51bGw7XG5cbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIGludm9rZSBjaGFuZ2UgZXZlbnRcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcblxuICAgICAgICAvLyBjYWxsIGNhbGxiYWNrXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTsgICAgICAgIFxuICAgIH1cblxuICAgIGdldCBpbnB1dElkKCk6IHN0cmluZyB7IFxuICAgICAgICByZXR1cm4gYCR7dGhpcy5pZCB8fCB0aGlzLl9yYWRpb0J1dHRvbklkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IGZhbHNlO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICAgIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0b2dnbGUgdGhlIGNoZWNrZWQgc3RhdGVcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3B0aW9uO1xuXG4gICAgICAgIC8vIGNhbGwgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIC8vIEZ1bmN0aW9ucyByZXF1aXJlZCB0byB1cGRhdGUgbmctbW9kZWxcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cbn1cbiJdfQ==