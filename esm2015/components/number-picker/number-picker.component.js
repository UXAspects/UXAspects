/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberPickerComponent),
    multi: true
};
export class NumberPickerComponent {
    constructor() {
        this._min = -Infinity;
        this._max = Infinity;
        this._step = 1;
        this._disabled = false;
        this._value = 0;
        this._propagateChange = (_) => { };
        this.valid = true;
        this.valueChange = new EventEmitter();
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
        this.valueChange.emit(value);
        this._propagateChange(value);
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set step(value) {
        this._step = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    increment(event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    decrement(event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    }
    /**
     * @return {?}
     */
    isValid() {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        let /** @type {?} */ scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NumberPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-number-picker',
                template: `<input type="number"
       role="spinbutton"
       class="form-control number-picker-input"
       [(ngModel)]="value"
       [min]="min"
       [max]="max"
       (keydown.ArrowDown)="decrement($event)"
       (keydown.ArrowUp)="increment($event)"
       (wheel)="onScroll($event)"
       step="any"
       [disabled]="disabled"
       [attr.aria-valuemin]="min"
       [attr.aria-valuenow]="value"
       [attr.aria-valuemax]="max">

<div class="number-picker-controls">

    <div class="number-picker-control-up"
         (click)="increment($event)"
         [class.disabled]="disabled || value >= max">

        <span class="hpe-icon hpe-up"></span>
    </div>

    <div class="number-picker-control-down"
         (click)="decrement($event)"
         [class.disabled]="disabled || value <= min">

        <span class="hpe-icon hpe-down"></span>
    </div>

</div>`,
                providers: [NUMBER_PICKER_VALUE_ACCESSOR],
                host: {
                    '[class.has-error]': '!isValid()'
                }
            },] },
];
/** @nocollapse */
NumberPickerComponent.ctorParameters = () => [];
NumberPickerComponent.propDecorators = {
    "valid": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "value": [{ type: Input, args: ['value',] },],
    "min": [{ type: Input },],
    "max": [{ type: Input },],
    "step": [{ type: Input },],
    "disabled": [{ type: Input },],
};
function NumberPickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NumberPickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NumberPickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NumberPickerComponent.propDecorators;
    /** @type {?} */
    NumberPickerComponent.prototype._min;
    /** @type {?} */
    NumberPickerComponent.prototype._max;
    /** @type {?} */
    NumberPickerComponent.prototype._step;
    /** @type {?} */
    NumberPickerComponent.prototype._disabled;
    /** @type {?} */
    NumberPickerComponent.prototype._value;
    /** @type {?} */
    NumberPickerComponent.prototype._propagateChange;
    /** @type {?} */
    NumberPickerComponent.prototype.valid;
    /** @type {?} */
    NumberPickerComponent.prototype.valueChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9udW1iZXItcGlja2VyL251bWJlci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHVCQUFNLDRCQUE0QixHQUFRO0lBQzdDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQXlDRixNQUFNOztvQkFFcUIsQ0FBQyxRQUFRO29CQUNULFFBQVE7cUJBQ1AsQ0FBQzt5QkFDSSxLQUFLO3NCQUNULENBQUM7Z0NBQ0MsQ0FBQyxDQUFNLFFBQVE7cUJBRWhCLElBQUk7MkJBQ04sSUFBSSxZQUFZLEVBQVU7Ozs7O1FBRzlDLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O0lBRXZCLElBQUksS0FBSyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDOzs7O1FBR0csR0FBRztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFFckIsSUFBSSxHQUFHLENBQUMsS0FBSztRQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxLQUFL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Z0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBTyxLQUFXOzs7OztJQUVwQyxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7O1lBOUlKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQlA7Z0JBQ0gsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7Z0JBQ3pDLElBQUksRUFBRTtvQkFDRixtQkFBbUIsRUFBRSxZQUFZO2lCQUNwQzthQUNKOzs7OztzQkFVSSxLQUFLOzRCQUNMLE1BQU07c0JBRU4sS0FBSyxTQUFDLE9BQU87b0JBVWIsS0FBSztvQkFRTCxLQUFLO3FCQVFMLEtBQUs7eUJBUUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBOVU1CRVJfUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtYmVyUGlja2VyQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1udW1iZXItcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwibnVtYmVyXCJcbiAgICAgICByb2xlPVwic3BpbmJ1dHRvblwiXG4gICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbnVtYmVyLXBpY2tlci1pbnB1dFwiXG4gICAgICAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gICAgICAgW21pbl09XCJtaW5cIlxuICAgICAgIFttYXhdPVwibWF4XCJcbiAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiZGVjcmVtZW50KCRldmVudClcIlxuICAgICAgIChrZXlkb3duLkFycm93VXApPVwiaW5jcmVtZW50KCRldmVudClcIlxuICAgICAgICh3aGVlbCk9XCJvblNjcm9sbCgkZXZlbnQpXCJcbiAgICAgICBzdGVwPVwiYW55XCJcbiAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiPlxuXG48ZGl2IGNsYXNzPVwibnVtYmVyLXBpY2tlci1jb250cm9sc1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm51bWJlci1waWNrZXItY29udHJvbC11cFwiXG4gICAgICAgICAoY2xpY2spPVwiaW5jcmVtZW50KCRldmVudClcIlxuICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkIHx8IHZhbHVlID49IG1heFwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLXVwXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm51bWJlci1waWNrZXItY29udHJvbC1kb3duXCJcbiAgICAgICAgIChjbGljayk9XCJkZWNyZW1lbnQoJGV2ZW50KVwiXG4gICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgdmFsdWUgPD0gbWluXCI+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtZG93blwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFtOVU1CRVJfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuaGFzLWVycm9yXSc6ICchaXNWYWxpZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXIgPSAtSW5maW5pdHk7XG4gICAgcHJpdmF0ZSBfbWF4OiBudW1iZXIgPSBJbmZpbml0eTtcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG4gICAgQElucHV0KCkgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQElucHV0KCd2YWx1ZScpXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG4gICAgc2V0IG1pbih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9taW4gPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG4gICAgc2V0IG1heCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tYXggPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zdGVwID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHBhcnNlRmxvYXQodmFsdWUpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICdkaXNhYmxlZCcpIHx8IHZhbHVlID09PSB0cnVlO1xuICAgIH1cblxuICAgIGluY3JlbWVudChldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbih0aGlzLnZhbHVlICsgdGhpcy5zdGVwLCB0aGlzLm1heCksIHRoaXMubWluKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudChldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLnZhbHVlIC0gdGhpcy5zdGVwLCB0aGlzLm1pbiksIHRoaXMubWF4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4gfHwgdGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZDtcbiAgICB9XG5cbiAgICBvblNjcm9sbChldmVudDogV2hlZWxFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGxldCBzY3JvbGxWYWx1ZSA9IGV2ZW50LmRlbHRhWSB8fCBldmVudC53aGVlbERlbHRhO1xuXG4gICAgICAgIGlmIChzY3JvbGxWYWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbn0iXX0=