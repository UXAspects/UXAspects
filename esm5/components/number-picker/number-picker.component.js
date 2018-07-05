/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var /** @type {?} */ NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NumberPickerComponent; }),
    multi: true
};
var NumberPickerComponent = (function () {
    function NumberPickerComponent() {
        this._min = -Infinity;
        this._max = Infinity;
        this._step = 1;
        this._disabled = false;
        this._value = 0;
        this._propagateChange = function (_) { };
        this.valid = true;
        this.valueChange = new EventEmitter();
    }
    Object.defineProperty(NumberPickerComponent.prototype, "value", {
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
            this.valueChange.emit(value);
            this._propagateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._step = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.increment = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.decrement = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    };
    /**
     * @return {?}
     */
    NumberPickerComponent.prototype.isValid = /**
     * @return {?}
     */
    function () {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onScroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberPickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberPickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberPickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NumberPickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    NumberPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-number-picker',
                    template: "<input type=\"number\"\n       role=\"spinbutton\"\n       class=\"form-control number-picker-input\"\n       [(ngModel)]=\"value\"\n       [min]=\"min\"\n       [max]=\"max\"\n       (keydown.ArrowDown)=\"decrement($event)\"\n       (keydown.ArrowUp)=\"increment($event)\"\n       (wheel)=\"onScroll($event)\"\n       step=\"any\"\n       [disabled]=\"disabled\"\n       [attr.aria-valuemin]=\"min\"\n       [attr.aria-valuenow]=\"value\"\n       [attr.aria-valuemax]=\"max\">\n\n<div class=\"number-picker-controls\">\n\n    <div class=\"number-picker-control-up\"\n         (click)=\"increment($event)\"\n         [class.disabled]=\"disabled || value >= max\">\n\n        <span class=\"hpe-icon hpe-up\"></span>\n    </div>\n\n    <div class=\"number-picker-control-down\"\n         (click)=\"decrement($event)\"\n         [class.disabled]=\"disabled || value <= min\">\n\n        <span class=\"hpe-icon hpe-down\"></span>\n    </div>\n\n</div>",
                    providers: [NUMBER_PICKER_VALUE_ACCESSOR],
                    host: {
                        '[class.has-error]': '!isValid()'
                    }
                },] },
    ];
    /** @nocollapse */
    NumberPickerComponent.ctorParameters = function () { return []; };
    NumberPickerComponent.propDecorators = {
        "valid": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "value": [{ type: Input, args: ['value',] },],
        "min": [{ type: Input },],
        "max": [{ type: Input },],
        "step": [{ type: Input },],
        "disabled": [{ type: Input },],
    };
    return NumberPickerComponent;
}());
export { NumberPickerComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9udW1iZXItcGlja2VyL251bWJlci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLHFCQUFNLDRCQUE0QixHQUFRO0lBQzdDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEscUJBQXFCLEVBQXJCLENBQXFCLENBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDOzs7b0JBMkN5QixDQUFDLFFBQVE7b0JBQ1QsUUFBUTtxQkFDUCxDQUFDO3lCQUNJLEtBQUs7c0JBQ1QsQ0FBQztnQ0FDQyxVQUFDLENBQU0sS0FBUTtxQkFFaEIsSUFBSTsyQkFDTixJQUFJLFlBQVksRUFBVTs7MEJBRzlDLHdDQUFLOzs7OztZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7UUFFdkIsVUFBVSxLQUFhO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzs7OzswQkFHRyxzQ0FBRzs7Ozs7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1FBRXJCLFVBQVEsS0FBSztZQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDckU7Ozs7MEJBR0csc0NBQUc7Ozs7O1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztRQUVyQixVQUFRLEtBQUs7WUFDVCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3JFOzs7OzBCQUdHLHVDQUFJOzs7OztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Ozs7UUFFdEIsVUFBUyxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN0RTs7OzswQkFHRywyQ0FBUTs7Ozs7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O1FBRTFCLFVBQWEsS0FBSztZQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxVQUFVLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1NBQzlIOzs7Ozs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxLQUFpQztRQUN2QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvRTtLQUNKOzs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxLQUFpQztRQUN2QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvRTtLQUNKOzs7O0lBRUQsdUNBQU87OztJQUFQO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3JCOzs7OztJQUVELHdDQUFROzs7O0lBQVIsVUFBUyxLQUFpQjtRQUV0QixxQkFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDO1FBRW5ELEVBQUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekI7S0FDSjs7Ozs7SUFFRCwwQ0FBVTs7OztJQUFWLFVBQVcsS0FBVTtRQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2QjtLQUNKOzs7OztJQUVELGdEQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsaURBQWlCOzs7O0lBQWpCLFVBQWtCLEVBQU8sS0FBVzs7Ozs7SUFFcEMsZ0RBQWdCOzs7O0lBQWhCLFVBQWlCLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQzlCOztnQkE5SUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxxN0JBK0JQO29CQUNILFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUN6QyxJQUFJLEVBQUU7d0JBQ0YsbUJBQW1CLEVBQUUsWUFBWTtxQkFDcEM7aUJBQ0o7Ozs7OzBCQVVJLEtBQUs7Z0NBQ0wsTUFBTTswQkFFTixLQUFLLFNBQUMsT0FBTzt3QkFVYixLQUFLO3dCQVFMLEtBQUs7eUJBUUwsS0FBSzs2QkFRTCxLQUFLOztnQ0E5RlY7O1NBZ0RhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBOVU1CRVJfUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtYmVyUGlja2VyQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1udW1iZXItcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwibnVtYmVyXCJcbiAgICAgICByb2xlPVwic3BpbmJ1dHRvblwiXG4gICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbnVtYmVyLXBpY2tlci1pbnB1dFwiXG4gICAgICAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gICAgICAgW21pbl09XCJtaW5cIlxuICAgICAgIFttYXhdPVwibWF4XCJcbiAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiZGVjcmVtZW50KCRldmVudClcIlxuICAgICAgIChrZXlkb3duLkFycm93VXApPVwiaW5jcmVtZW50KCRldmVudClcIlxuICAgICAgICh3aGVlbCk9XCJvblNjcm9sbCgkZXZlbnQpXCJcbiAgICAgICBzdGVwPVwiYW55XCJcbiAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCJcbiAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiPlxuXG48ZGl2IGNsYXNzPVwibnVtYmVyLXBpY2tlci1jb250cm9sc1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cIm51bWJlci1waWNrZXItY29udHJvbC11cFwiXG4gICAgICAgICAoY2xpY2spPVwiaW5jcmVtZW50KCRldmVudClcIlxuICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkIHx8IHZhbHVlID49IG1heFwiPlxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLXVwXCI+PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm51bWJlci1waWNrZXItY29udHJvbC1kb3duXCJcbiAgICAgICAgIChjbGljayk9XCJkZWNyZW1lbnQoJGV2ZW50KVwiXG4gICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgdmFsdWUgPD0gbWluXCI+XG5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtZG93blwiPjwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFtOVU1CRVJfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuaGFzLWVycm9yXSc6ICchaXNWYWxpZCgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTnVtYmVyUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcHJpdmF0ZSBfbWluOiBudW1iZXIgPSAtSW5maW5pdHk7XG4gICAgcHJpdmF0ZSBfbWF4OiBudW1iZXIgPSBJbmZpbml0eTtcbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuXG4gICAgQElucHV0KCkgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQElucHV0KCd2YWx1ZScpXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICB9XG4gICAgc2V0IG1pbih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9taW4gPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICB9XG4gICAgc2V0IG1heCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tYXggPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zdGVwID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHBhcnNlRmxvYXQodmFsdWUpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICdkaXNhYmxlZCcpIHx8IHZhbHVlID09PSB0cnVlO1xuICAgIH1cblxuICAgIGluY3JlbWVudChldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbih0aGlzLnZhbHVlICsgdGhpcy5zdGVwLCB0aGlzLm1heCksIHRoaXMubWluKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JlbWVudChldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLnZhbHVlIC0gdGhpcy5zdGVwLCB0aGlzLm1pbiksIHRoaXMubWF4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4gfHwgdGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZDtcbiAgICB9XG5cbiAgICBvblNjcm9sbChldmVudDogV2hlZWxFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGxldCBzY3JvbGxWYWx1ZSA9IGV2ZW50LmRlbHRhWSB8fCBldmVudC53aGVlbERlbHRhO1xuXG4gICAgICAgIGlmIChzY3JvbGxWYWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7IH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbn0iXX0=