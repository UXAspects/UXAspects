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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbi1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Bpbi1idXR0b24vc3Bpbi1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWtERixNQUFNOztvQkFZc0IsTUFBTTsyQkFHQyxFQUFFO3dCQUNKLEtBQUs7d0JBQ0wsSUFBSTt3QkFDSixJQUFJO3lCQUNILElBQUk7eUJBQ0osSUFBSTsyQkFNVixJQUFJLFlBQVksRUFBTzt5QkFFekIsSUFBSSxZQUFZLEVBQVE7eUJBQ3hCLElBQUksWUFBWSxFQUFRO2lDQUVkLFNBQVM7Z0NBQ0osU0FBUzs7Ozs7O1FBOUJqQyxLQUFLLENBQUMsS0FBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Ozs7O0lBRzdCLElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCOzs7OztJQTBCRCxNQUFNLENBQUMsS0FBaUI7UUFFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDMUI7Ozs7SUFFRCxnQkFBZ0I7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7S0FDSjs7OztJQUVELGdCQUFnQjtRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtLQUNKOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQW9CO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQzlCOzs7WUE3SEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF5Q0o7Z0JBQ04sYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQzthQUMxQzs7OztzQkFHSSxLQUFLO3FCQVVMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO21DQUVMLEtBQUs7K0JBQ0wsS0FBSzttQ0FDTCxLQUFLOzRCQUVMLE1BQU07MEJBRU4sTUFBTTswQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgU1BJTl9CVVRUT05fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTcGluQnV0dG9uQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zcGluLWJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGA8YnV0dG9uIGNsYXNzPVwic3Bpbi1idXR0b25cIlxuICAgICAgICAqbmdJZj1cInNwaW5uZXJzXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaW5jcmVtZW50QXJpYUxhYmVsXCJcbiAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJ0cmlnZ2VySW5jcmVtZW50KClcIj5cblxuICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS11cFwiPjwvc3Bhbj5cbjwvYnV0dG9uPlxuXG48aW5wdXQgW3R5cGVdPVwidHlwZVwiXG4gICAgICAgcm9sZT1cInNwaW5idXR0b25cIlxuICAgICAgIFttaW5dPVwibWluXCJcbiAgICAgICBbbWF4XT1cIm1heFwiXG4gICAgICAgW3RhYmluZGV4XT1cIjBcIlxuICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgIFtyZWFkT25seV09XCJyZWFkT25seVwiXG4gICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImlucHV0QXJpYUxhYmVsXCJcbiAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIm1pblwiXG4gICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZVwiXG4gICAgICAgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIlxuICAgICAgIFthdHRyLmFyaWEtcmVhZG9ubHldPVwicmVhZE9ubHlcIlxuICAgICAgIFtuZ01vZGVsXT1cInZhbHVlXCJcbiAgICAgICAobmdNb2RlbENoYW5nZSk9XCJ2YWx1ZUNoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICh3aGVlbCk9XCJzY3JvbGwoJGV2ZW50KVwiXG4gICAgICAgKGtleWRvd24uYXJyb3d1cCk9XCJhcnJvd2tleXMgPyB0cmlnZ2VySW5jcmVtZW50KCkgOiBudWxsOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgKGtleWRvd24uYXJyb3dkb3duKT1cImFycm93a2V5cyA/IHRyaWdnZXJEZWNyZW1lbnQoKSA6IG51bGw7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG5cbjxidXR0b24gY2xhc3M9XCJzcGluLWJ1dHRvblwiXG4gICAgICAgICpuZ0lmPVwic3Bpbm5lcnNcIlxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJkZWNyZW1lbnRBcmlhTGFiZWxcIlxuICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgKGNsaWNrKT1cInRyaWdnZXJEZWNyZW1lbnQoKVwiPlxuXG4gIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWRvd25cIj48L3NwYW4+XG48L2J1dHRvbj5gLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbU1BJTl9CVVRUT05fVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5CdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc3Bpbm5lcnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHJlYWRPbmx5OiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzY3JvbGxpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGFycm93a2V5czogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBpbmNyZW1lbnRBcmlhTGFiZWw6IHN0cmluZztcbiAgICBASW5wdXQoKSBpbnB1dEFyaWFMYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGRlY3JlbWVudEFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCkgaW5jcmVtZW50ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBkZWNyZW1lbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICAgIHNjcm9sbChldmVudDogV2hlZWxFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5kZWx0YVkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJEZWNyZW1lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckluY3JlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB0cmlnZ2VySW5jcmVtZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyaWdnZXJEZWNyZW1lbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG59Il19