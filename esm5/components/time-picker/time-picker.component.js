/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, map } from 'rxjs/operators';
export var /** @type {?} */ TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TimePickerComponent; }),
    multi: true
};
var TimePickerComponent = /** @class */ (function () {
    function TimePickerComponent() {
        var _this = this;
        this.arrowkeys = true;
        this.mousewheel = true;
        this.disabled = false;
        this.readOnly = false;
        this.showMeridian = false;
        this.showHours = true;
        this.showMinutes = true;
        this.showSeconds = false;
        this.showSpinners = true;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.meridians = ['AM', 'PM'];
        this.valueChange = new EventEmitter();
        this.isValid = new EventEmitter();
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
        this.value$ = new BehaviorSubject(new Date());
        // create observables that are derived from the latest value
        this.hour$ = this.value$.pipe(map(function (date) { return date.getHours(); }), map(function (hour) { return _this.showMeridian ? _this.getMeridianTime(hour) : hour; }));
        this.minute$ = this.value$.pipe(map(function (date) { return date.getMinutes(); }));
        this.second$ = this.value$.pipe(map(function (date) { return date.getSeconds(); }));
        this.meridian$ = this.value$.pipe(map(function (date) { return date.getHours() < 12 ? _this.meridians[0] : _this.meridians[1]; }));
        this.valid$ = this.value$.pipe(map(function (date) { return _this.checkValidity(date); }));
        this._meridian = this.meridians[0];
        this._subscription = this.valid$.pipe(distinctUntilChanged()).subscribe(function (valid) { return _this.isValid.emit(valid); });
    }
    Object.defineProperty(TimePickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return new Date(this.value$.value);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.value$.next(new Date(value));
            this.valueChange.emit(this.value$.value);
            this.onChangeCallback(this.value$.value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.writeValue = /**
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
    TimePickerComponent.prototype.registerOnChange = /**
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
    TimePickerComponent.prototype.registerOnTouched = /**
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
    TimePickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    TimePickerComponent.prototype.getMeridianTime = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        return hour > 12 ? hour - 12 : hour;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    TimePickerComponent.prototype.setHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        var /** @type {?} */ date = this.value;
        date.setHours(hour ? hour : 0);
        this.value = date;
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    TimePickerComponent.prototype.setMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        var /** @type {?} */ date = this.value;
        date.setMinutes(minute ? minute : 0);
        this.value = date;
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    TimePickerComponent.prototype.setSeconds = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        var /** @type {?} */ date = this.value;
        date.setSeconds(seconds ? seconds : 0);
        this.value = date;
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.incrementHour = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() + this.hourStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.decrementHour = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() - this.hourStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.incrementMinute = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() + this.minuteStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.decrementMinute = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() - this.minuteStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.incrementSecond = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() + this.secondStep);
    };
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    TimePickerComponent.prototype.decrementSecond = /**
     * @param {?=} arrowkey
     * @return {?}
     */
    function (arrowkey) {
        if (arrowkey === void 0) { arrowkey = false; }
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() - this.secondStep);
    };
    /**
     * @param {?} meridian
     * @return {?}
     */
    TimePickerComponent.prototype.selectMeridian = /**
     * @param {?} meridian
     * @return {?}
     */
    function (meridian) {
        this._meridian = meridian;
        // get the current time
        var /** @type {?} */ hour = this.value.getHours();
        // if we have selected AM
        if (meridian === this.meridians[0]) {
            if (hour >= 12) {
                this.setHour(hour - 12);
            }
        }
        // if we have selected PM
        if (meridian === this.meridians[1]) {
            if (hour < 12) {
                this.setHour(hour + 12);
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    TimePickerComponent.prototype.checkValidity = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        var /** @type {?} */ valid = true;
        if (this.min && date.getTime() <= this.min.getTime()) {
            valid = false;
        }
        if (this.max && date.getTime() >= this.max.getTime()) {
            valid = false;
        }
        return valid;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.hourChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // convert the string to a number
        var /** @type {?} */ hour = parseInt(value);
        var /** @type {?} */ currentHour = this.value.getHours();
        // if the value hasn't changed, do nothing
        if (hour === currentHour) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(hour)) {
            if (hour < 0) {
                hour = 0;
            }
            if (hour > (this.showMeridian ? 12 : 23)) {
                hour = this.showMeridian ? 12 : 23;
            }
        }
        hour = isNaN(hour) ? currentHour : hour;
        // if the number is invalid then restore it to the previous value
        if (this._meridian === this.meridians[0]) {
            if (hour >= 12) {
                hour -= 12;
            }
        }
        // if we have selected PM
        if (this._meridian === this.meridians[1]) {
            if (hour < 12) {
                hour += 12;
            }
        }
        this.setHour(hour);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.minuteChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // convert the string to a number
        var /** @type {?} */ minute = parseInt(value);
        var /** @type {?} */ currentMinute = this.value.getMinutes();
        // if the value hasn't changed, do nothing
        if (minute === currentMinute) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(minute)) {
            if (minute < 0) {
                minute = 59;
            }
            if (minute > 59) {
                minute = 0;
            }
        }
        // if the number is invalid then restore it to the previous value
        this.setMinute(isNaN(minute) ? currentMinute : minute);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimePickerComponent.prototype.secondChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // convert the string to a number
        var /** @type {?} */ second = parseInt(value);
        var /** @type {?} */ currentSecond = this.value.getSeconds();
        // if the value hasn't changed, do nothing
        if (second === currentSecond) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(second)) {
            if (second < 0) {
                second = 0;
            }
            if (second > 59) {
                second = 59;
            }
        }
        // if the number is invalid then restore it to the previous value
        this.setSeconds(isNaN(second) ? currentSecond : second);
    };
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-time-picker',
                    template: "<div class=\"time-picker\" aria-label=\"Time picker\">\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showHours\">\n\n        <ux-spin-button\n            type=\"text\"\n            class=\"time-spinner\"\n            placeholder=\"HH\"\n            [min]=\"0\"\n            [max]=\"showMeridian ? 12 : 23\"\n            [value]=\"hour$ | async | timeFormat:!showMeridian\"\n            (valueChange)=\"hourChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"hour\"\n            incrementAriaLabel=\"Increment the hour\"\n            decrementAriaLabel=\"Decrement the hour\"\n            (increment)=\"incrementHour()\"\n            (decrement)=\"decrementHour()\">\n        </ux-spin-button>\n\n    </div>\n\n    <div class=\"time-picker-separator\" *ngIf=\"showMinutes\">:</div>\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showMinutes\">\n\n        <ux-spin-button\n            type=\"text\"\n            class=\"time-spinner\"\n            placeholder=\"MM\"\n            [min]=\"0\"\n            [max]=\"59\"\n            [value]=\"minute$ | async | timeFormat:true\"\n            (valueChange)=\"minuteChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"minute\"\n            incrementAriaLabel=\"Increment the minute\"\n            decrementAriaLabel=\"Decrement the minute\"\n            (increment)=\"incrementMinute()\"\n            (decrement)=\"decrementMinute()\">\n        </ux-spin-button>\n\n    </div>\n\n    <div class=\"time-picker-separator\" *ngIf=\"showSeconds\">:</div>\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showSeconds\">\n\n        <ux-spin-button\n            type=\"text\"\n            class=\"time-spinner\"\n            placeholder=\"SS\"\n            [min]=\"0\"\n            [max]=\"59\"\n            [value]=\"second$ | async | timeFormat:true\"\n            (valueChange)=\"secondChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"seconds\"\n            incrementAriaLabel=\"Increment the second\"\n            decrementAriaLabel=\"Decrement the second\"\n            (increment)=\"incrementSecond()\"\n            (decrement)=\"decrementSecond()\">\n        </ux-spin-button>\n\n    </div>\n</div>\n\n<div class=\"time-picker-meridian\" *ngIf=\"showMeridian\">\n\n    <div class=\"btn-group\" role=\"radiogroup\">\n\n        <button class=\"btn button-toggle-accent\"\n                *ngFor=\"let meridian of meridians\"\n                role=\"radio\"\n                tabindex=\"0\"\n                [disabled]=\"disabled\"\n                (click)=\"selectMeridian(meridian)\"\n                [class.active]=\"meridian === (meridian$ | async)\"\n                [attr.aria-label]=\"meridian\"\n                [attr.aria-checked]=\"meridian === (meridian$ | async)\"\n                [attr.aria-disabled]=\"disabled\">\n                {{ meridian }}\n        </button>\n\n    </div>\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TIME_PICKER_VALUE_ACCESSOR],
                    host: {
                        'aria-label': 'Time Picker'
                    }
                }] }
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return []; };
    TimePickerComponent.propDecorators = {
        arrowkeys: [{ type: Input }],
        mousewheel: [{ type: Input }],
        disabled: [{ type: Input }],
        readOnly: [{ type: Input }],
        showMeridian: [{ type: Input }],
        showHours: [{ type: Input }],
        showMinutes: [{ type: Input }],
        showSeconds: [{ type: Input }],
        showSpinners: [{ type: Input }],
        hourStep: [{ type: Input }],
        minuteStep: [{ type: Input }],
        secondStep: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        meridians: [{ type: Input }],
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        isValid: [{ type: Output }]
    };
    return TimePickerComponent;
}());
export { TimePickerComponent };
function TimePickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TimePickerComponent.prototype.arrowkeys;
    /** @type {?} */
    TimePickerComponent.prototype.mousewheel;
    /** @type {?} */
    TimePickerComponent.prototype.disabled;
    /** @type {?} */
    TimePickerComponent.prototype.readOnly;
    /** @type {?} */
    TimePickerComponent.prototype.showMeridian;
    /** @type {?} */
    TimePickerComponent.prototype.showHours;
    /** @type {?} */
    TimePickerComponent.prototype.showMinutes;
    /** @type {?} */
    TimePickerComponent.prototype.showSeconds;
    /** @type {?} */
    TimePickerComponent.prototype.showSpinners;
    /** @type {?} */
    TimePickerComponent.prototype.hourStep;
    /** @type {?} */
    TimePickerComponent.prototype.minuteStep;
    /** @type {?} */
    TimePickerComponent.prototype.secondStep;
    /** @type {?} */
    TimePickerComponent.prototype.min;
    /** @type {?} */
    TimePickerComponent.prototype.max;
    /** @type {?} */
    TimePickerComponent.prototype.meridians;
    /** @type {?} */
    TimePickerComponent.prototype.valueChange;
    /** @type {?} */
    TimePickerComponent.prototype.isValid;
    /** @type {?} */
    TimePickerComponent.prototype.onTouchedCallback;
    /** @type {?} */
    TimePickerComponent.prototype.onChangeCallback;
    /** @type {?} */
    TimePickerComponent.prototype.value$;
    /** @type {?} */
    TimePickerComponent.prototype.hour$;
    /** @type {?} */
    TimePickerComponent.prototype.minute$;
    /** @type {?} */
    TimePickerComponent.prototype.second$;
    /** @type {?} */
    TimePickerComponent.prototype.meridian$;
    /** @type {?} */
    TimePickerComponent.prototype.valid$;
    /** @type {?} */
    TimePickerComponent.prototype._meridian;
    /** @type {?} */
    TimePickerComponent.prototype._subscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRCxNQUFNLENBQUMscUJBQU0sMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxtQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBK0RFO1FBQUEsaUJBRUM7eUJBbkQ2QixJQUFJOzBCQUNILElBQUk7d0JBQ04sS0FBSzt3QkFDTCxLQUFLOzRCQUVELEtBQUs7eUJBQ1IsSUFBSTsyQkFDRixJQUFJOzJCQUNKLEtBQUs7NEJBQ0osSUFBSTt3QkFFVCxDQUFDOzBCQUNDLENBQUM7MEJBQ0QsQ0FBQzt5QkFJQSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7MkJBY25CLElBQUksWUFBWSxFQUFRO3VCQUM1QixJQUFJLFlBQVksRUFBVztpQ0FFZixlQUFTO2dDQUNILGVBQVM7c0JBRXRDLElBQUksZUFBZSxDQUFPLElBQUksSUFBSSxFQUFFLENBQUM7O3FCQUdsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUks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QUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7K0JBRUwsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLOzJCQUVMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3NCQUVMLEtBQUs7c0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUVMLEtBQUs7OEJBWUwsTUFBTTswQkFDTixNQUFNOzs4QkF6RFg7O1NBdUJhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5leHBvcnQgY29uc3QgVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1RJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdhcmlhLWxhYmVsJzogJ1RpbWUgUGlja2VyJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgYXJyb3drZXlzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBtb3VzZXdoZWVsOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHJlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzaG93TWVyaWRpYW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93SG91cnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dNaW51dGVzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93U2Vjb25kczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dTcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBob3VyU3RlcDogbnVtYmVyID0gMTtcbiAgICBASW5wdXQoKSBtaW51dGVTdGVwOiBudW1iZXIgPSAxO1xuICAgIEBJbnB1dCgpIHNlY29uZFN0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBtaW46IERhdGU7XG4gICAgQElucHV0KCkgbWF4OiBEYXRlO1xuICAgIEBJbnB1dCgpIG1lcmlkaWFuczogc3RyaW5nW10gPSBbJ0FNJywgJ1BNJ107XG5cbiAgICBASW5wdXQoKSBzZXQgdmFsdWUodmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSQubmV4dChuZXcgRGF0ZSh2YWx1ZSkpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSQudmFsdWUpO1xuXG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlJC52YWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogRGF0ZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnZhbHVlJC52YWx1ZSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuICAgIEBPdXRwdXQoKSBpc1ZhbGlkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gICAgb25DaGFuZ2VDYWxsYmFjazogKF86IERhdGUpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgICB2YWx1ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KG5ldyBEYXRlKCkpO1xuXG4gICAgLy8gY3JlYXRlIG9ic2VydmFibGVzIHRoYXQgYXJlIGRlcml2ZWQgZnJvbSB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgaG91ciQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMudmFsdWUkLnBpcGUobWFwKGRhdGUgPT4gZGF0ZS5nZXRIb3VycygpKSwgbWFwKGhvdXIgPT4gdGhpcy5zaG93TWVyaWRpYW4gPyB0aGlzLmdldE1lcmlkaWFuVGltZShob3VyKSA6IGhvdXIpKTtcbiAgICBtaW51dGUkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLnZhbHVlJC5waXBlKG1hcChkYXRlID0+IGRhdGUuZ2V0TWludXRlcygpKSk7XG4gICAgc2Vjb25kJDogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy52YWx1ZSQucGlwZShtYXAoZGF0ZSA9PiBkYXRlLmdldFNlY29uZHMoKSkpO1xuICAgIG1lcmlkaWFuJDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy52YWx1ZSQucGlwZShtYXAoZGF0ZSA9PiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/IHRoaXMubWVyaWRpYW5zWzBdIDogdGhpcy5tZXJpZGlhbnNbMV0pKTtcbiAgICB2YWxpZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLnZhbHVlJC5waXBlKG1hcChkYXRlID0+IHRoaXMuY2hlY2tWYWxpZGl0eShkYXRlKSkpO1xuXG4gICAgcHJpdmF0ZSBfbWVyaWRpYW46IHN0cmluZyA9IHRoaXMubWVyaWRpYW5zWzBdO1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMudmFsaWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSkuc3Vic2NyaWJlKHZhbGlkID0+IHRoaXMuaXNWYWxpZC5lbWl0KHZhbGlkKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBEYXRlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0TWVyaWRpYW5UaW1lKGhvdXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBob3VyID4gMTIgPyBob3VyIC0gMTIgOiBob3VyO1xuICAgIH1cblxuICAgIHNldEhvdXIoaG91cjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBkYXRlLnNldEhvdXJzKGhvdXIgPyBob3VyIDogMCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgc2V0TWludXRlKG1pbnV0ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBkYXRlLnNldE1pbnV0ZXMobWludXRlID8gbWludXRlIDogMCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgc2V0U2Vjb25kcyhzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGRhdGUuc2V0U2Vjb25kcyhzZWNvbmRzID8gc2Vjb25kcyA6IDApO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgIH1cblxuICAgIGluY3JlbWVudEhvdXIoYXJyb3drZXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBhcnJvd2tleSAmJiAhdGhpcy5hcnJvd2tleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SG91cih0aGlzLnZhbHVlLmdldEhvdXJzKCkgKyB0aGlzLmhvdXJTdGVwKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRIb3VyKGFycm93a2V5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgYXJyb3drZXkgJiYgIXRoaXMuYXJyb3drZXlzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhvdXIodGhpcy52YWx1ZS5nZXRIb3VycygpIC0gdGhpcy5ob3VyU3RlcCk7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50TWludXRlKGFycm93a2V5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgYXJyb3drZXkgJiYgIXRoaXMuYXJyb3drZXlzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldE1pbnV0ZSh0aGlzLnZhbHVlLmdldE1pbnV0ZXMoKSArIHRoaXMubWludXRlU3RlcCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50TWludXRlKGFycm93a2V5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgYXJyb3drZXkgJiYgIXRoaXMuYXJyb3drZXlzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldE1pbnV0ZSh0aGlzLnZhbHVlLmdldE1pbnV0ZXMoKSAtIHRoaXMubWludXRlU3RlcCk7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50U2Vjb25kKGFycm93a2V5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgYXJyb3drZXkgJiYgIXRoaXMuYXJyb3drZXlzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNlY29uZHModGhpcy52YWx1ZS5nZXRTZWNvbmRzKCkgKyB0aGlzLnNlY29uZFN0ZXApO1xuICAgIH1cblxuICAgIGRlY3JlbWVudFNlY29uZChhcnJvd2tleTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGFycm93a2V5ICYmICF0aGlzLmFycm93a2V5cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWNvbmRzKHRoaXMudmFsdWUuZ2V0U2Vjb25kcygpIC0gdGhpcy5zZWNvbmRTdGVwKTtcbiAgICB9XG5cbiAgICBzZWxlY3RNZXJpZGlhbihtZXJpZGlhbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lcmlkaWFuID0gbWVyaWRpYW47XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgY29uc3QgaG91ciA9IHRoaXMudmFsdWUuZ2V0SG91cnMoKTtcblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIHNlbGVjdGVkIEFNXG4gICAgICAgIGlmIChtZXJpZGlhbiA9PT0gdGhpcy5tZXJpZGlhbnNbMF0pIHtcbiAgICAgICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIb3VyKGhvdXIgLSAxMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIHNlbGVjdGVkIFBNXG4gICAgICAgIGlmIChtZXJpZGlhbiA9PT0gdGhpcy5tZXJpZGlhbnNbMV0pIHtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhvdXIoaG91ciArIDEyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrVmFsaWRpdHkoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLm1pbiAmJiBkYXRlLmdldFRpbWUoKSA8PSB0aGlzLm1pbi5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXggJiYgZGF0ZS5nZXRUaW1lKCkgPj0gdGhpcy5tYXguZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cblxuICAgIGhvdXJDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIHN0cmluZyB0byBhIG51bWJlclxuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRIb3VyID0gdGhpcy52YWx1ZS5nZXRIb3VycygpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBoYXNuJ3QgY2hhbmdlZCwgZG8gbm90aGluZ1xuICAgICAgICBpZiAoaG91ciA9PT0gY3VycmVudEhvdXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgaG91cnMgaXMgdmFsaWRcbiAgICAgICAgaWYgKCFpc05hTihob3VyKSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPCAwKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChob3VyID4gKHRoaXMuc2hvd01lcmlkaWFuID8gMTIgOiAyMykpIHtcbiAgICAgICAgICAgICAgICBob3VyID0gdGhpcy5zaG93TWVyaWRpYW4gPyAxMiA6IDIzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaG91ciA9IGlzTmFOKGhvdXIpID8gY3VycmVudEhvdXIgOiBob3VyO1xuXG4gICAgICAgIC8vIGlmIHRoZSBudW1iZXIgaXMgaW52YWxpZCB0aGVuIHJlc3RvcmUgaXQgdG8gdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgIGlmICh0aGlzLl9tZXJpZGlhbiA9PT0gdGhpcy5tZXJpZGlhbnNbMF0pIHtcbiAgICAgICAgICAgIGlmIChob3VyID49IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciAtPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgc2VsZWN0ZWQgUE1cbiAgICAgICAgaWYgKHRoaXMuX21lcmlkaWFuID09PSB0aGlzLm1lcmlkaWFuc1sxXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgKz0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhvdXIoaG91cik7XG4gICAgfVxuXG4gICAgbWludXRlQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IHRoZSBzdHJpbmcgdG8gYSBudW1iZXJcbiAgICAgICAgbGV0IG1pbnV0ZSA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRNaW51dGUgPSB0aGlzLnZhbHVlLmdldE1pbnV0ZXMoKTtcblxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaGFzbid0IGNoYW5nZWQsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKG1pbnV0ZSA9PT0gY3VycmVudE1pbnV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBob3VycyBpcyB2YWxpZFxuICAgICAgICBpZiAoIWlzTmFOKG1pbnV0ZSkpIHtcbiAgICAgICAgICAgIGlmIChtaW51dGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgbWludXRlID0gNTk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaW51dGUgPiA1OSkge1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVyIGlzIGludmFsaWQgdGhlbiByZXN0b3JlIGl0IHRvIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgICAgICB0aGlzLnNldE1pbnV0ZShpc05hTihtaW51dGUpID8gY3VycmVudE1pbnV0ZSA6IG1pbnV0ZSk7XG4gICAgfVxuXG4gICAgc2Vjb25kQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gY29udmVydCB0aGUgc3RyaW5nIHRvIGEgbnVtYmVyXG4gICAgICAgIGxldCBzZWNvbmQgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGxldCBjdXJyZW50U2Vjb25kID0gdGhpcy52YWx1ZS5nZXRTZWNvbmRzKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGhhc24ndCBjaGFuZ2VkLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChzZWNvbmQgPT09IGN1cnJlbnRTZWNvbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgaG91cnMgaXMgdmFsaWRcbiAgICAgICAgaWYgKCFpc05hTihzZWNvbmQpKSB7XG4gICAgICAgICAgICBpZiAoc2Vjb25kIDwgMCkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWNvbmQgPiA1OSkge1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IDU5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBpcyBpbnZhbGlkIHRoZW4gcmVzdG9yZSBpdCB0byB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRTZWNvbmRzKGlzTmFOKHNlY29uZCkgPyBjdXJyZW50U2Vjb25kIDogc2Vjb25kKTtcbiAgICB9XG59Il19