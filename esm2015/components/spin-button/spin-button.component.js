/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ SPIN_BUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpinButtonComponent),
    multi: true
};
export class SpinButtonComponent {
    constructor() {
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
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        this.onChangeCallback(value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    scroll(event) {
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
    }
    /**
     * @return {?}
     */
    triggerIncrement() {
        if (!this.disabled) {
            this.increment.emit();
        }
    }
    /**
     * @return {?}
     */
    triggerDecrement() {
        if (!this.disabled) {
            this.decrement.emit();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
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
SpinButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-spin-button',
                template: `<button class="spin-button"
        *ngIf="spinners"
        tabindex="-1"
        [disabled]="disabled"
        [attr.aria-label]="incrementAriaLabel"
        [attr.aria-disabled]="disabled"
        (click)="triggerIncrement()">

  <span class="hpe-icon hpe-up"></span>
</button>

<input [type]="type"
       role="spinbutton"
       [min]="min"
       [max]="max"
       [tabindex]="0"
       class="form-control"
       [placeholder]="placeholder"
       [readOnly]="readOnly"
       [disabled]="disabled"
       [attr.aria-label]="inputAriaLabel"
       [attr.aria-disabled]="disabled"
       [attr.aria-valuemin]="min"
       [attr.aria-valuenow]="value"
       [attr.aria-valuemax]="max"
       [attr.aria-readonly]="readOnly"
       [ngModel]="value"
       (ngModelChange)="valueChange.emit($event)"
       (wheel)="scroll($event)"
       (keydown.arrowup)="arrowkeys ? triggerIncrement() : null; $event.preventDefault()"
       (keydown.arrowdown)="arrowkeys ? triggerDecrement() : null; $event.preventDefault()">

<button class="spin-button"
        *ngIf="spinners"
        tabindex="-1"
        [disabled]="disabled"
        [attr.aria-label]="decrementAriaLabel"
        [attr.aria-disabled]="disabled"
        (click)="triggerDecrement()">

  <span class="hpe-icon hpe-down"></span>
</button>`,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [SPIN_BUTTON_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
SpinButtonComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bpbi1idXR0b24vc3Bpbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWtERixNQUFNOztvQkFZc0IsTUFBTTsyQkFHQyxFQUFFO3dCQUNKLEtBQUs7d0JBQ0wsSUFBSTt3QkFDSixJQUFJO3lCQUNILElBQUk7eUJBQ0osSUFBSTsyQkFNVixJQUFJLFlBQVksRUFBTzt5QkFFekIsSUFBSSxZQUFZLEVBQVE7eUJBQ3hCLElBQUksWUFBWSxFQUFRO2lDQUVkLFNBQVM7Z0NBQ0osU0FBUzs7Ozs7O1FBOUJqQyxLQUFLLENBQUMsS0FBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Ozs7O0lBRzdCLElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCOzs7OztJQTBCRCxNQUFNLENBQUMsS0FBaUI7UUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDMUI7Ozs7SUFFRCxnQkFBZ0I7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7S0FDSjs7OztJQUVELGdCQUFnQjtRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtLQUNKOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQW9CO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQzlCOzs7WUE3SEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF5Q0o7Z0JBQ04sYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzthQUMxQzs7Ozs7c0JBR0ksS0FBSztxQkFVTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzttQ0FFTCxLQUFLOytCQUNMLEtBQUs7bUNBQ0wsS0FBSzs0QkFFTCxNQUFNOzBCQUVOLE1BQU07MEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFNQSU5fQlVUVE9OX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU3BpbkJ1dHRvbkNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtc3Bpbi1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgPGJ1dHRvbiBjbGFzcz1cInNwaW4tYnV0dG9uXCJcbiAgICAgICAgKm5nSWY9XCJzcGlubmVyc1wiXG4gICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImluY3JlbWVudEFyaWFMYWJlbFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAoY2xpY2spPVwidHJpZ2dlckluY3JlbWVudCgpXCI+XG5cbiAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtdXBcIj48L3NwYW4+XG48L2J1dHRvbj5cblxuPGlucHV0IFt0eXBlXT1cInR5cGVcIlxuICAgICAgIHJvbGU9XCJzcGluYnV0dG9uXCJcbiAgICAgICBbbWluXT1cIm1pblwiXG4gICAgICAgW21heF09XCJtYXhcIlxuICAgICAgIFt0YWJpbmRleF09XCIwXCJcbiAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICBbcmVhZE9ubHldPVwicmVhZE9ubHlcIlxuICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpbnB1dEFyaWFMYWJlbFwiXG4gICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIlxuICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIlxuICAgICAgIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCJcbiAgICAgICBbYXR0ci5hcmlhLXJlYWRvbmx5XT1cInJlYWRPbmx5XCJcbiAgICAgICBbbmdNb2RlbF09XCJ2YWx1ZVwiXG4gICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidmFsdWVDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAod2hlZWwpPVwic2Nyb2xsKCRldmVudClcIlxuICAgICAgIChrZXlkb3duLmFycm93dXApPVwiYXJyb3drZXlzID8gdHJpZ2dlckluY3JlbWVudCgpIDogbnVsbDsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgIChrZXlkb3duLmFycm93ZG93bik9XCJhcnJvd2tleXMgPyB0cmlnZ2VyRGVjcmVtZW50KCkgOiBudWxsOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiPlxuXG48YnV0dG9uIGNsYXNzPVwic3Bpbi1idXR0b25cIlxuICAgICAgICAqbmdJZj1cInNwaW5uZXJzXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZGVjcmVtZW50QXJpYUxhYmVsXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJ0cmlnZ2VyRGVjcmVtZW50KClcIj5cblxuICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1kb3duXCI+PC9zcGFuPlxuPC9idXR0b24+YCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1NQSU5fQlVUVE9OX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTcGluQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ3RleHQnO1xuICAgIEBJbnB1dCgpIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSByZWFkT25seTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2Nyb2xsaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBhcnJvd2tleXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgaW5jcmVtZW50QXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaW5wdXRBcmlhTGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBkZWNyZW1lbnRBcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIGluY3JlbWVudCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgZGVjcmVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gICAgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgICBzY3JvbGwoZXZlbnQ6IFdoZWVsRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuZGVsdGFZID4gMCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRGVjcmVtZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJJbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdHJpZ2dlckluY3JlbWVudCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmlnZ2VyRGVjcmVtZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxufSJdfQ==