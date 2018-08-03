/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, map } from 'rxjs/operators';
export const /** @type {?} */ TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
};
export class TimePickerComponent {
    constructor() {
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
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
        this.value$ = new BehaviorSubject(new Date());
        // create observables that are derived from the latest value
        this.hour$ = this.value$.pipe(map(date => date.getHours()), map(hour => this.showMeridian ? this.getMeridianTime(hour) : hour));
        this.minute$ = this.value$.pipe(map(date => date.getMinutes()));
        this.second$ = this.value$.pipe(map(date => date.getSeconds()));
        this.meridian$ = this.value$.pipe(map(date => date.getHours() < 12 ? this.meridians[0] : this.meridians[1]));
        this.valid$ = this.value$.pipe(map(date => this.checkValidity(date)));
        this._meridian = this.meridians[0];
        this._subscription = this.valid$.pipe(distinctUntilChanged()).subscribe(valid => this.isValid.emit(valid));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.value$.next(new Date(value));
        this.valueChange.emit(this.value$.value);
        this.onChangeCallback(this.value$.value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get value() {
        return new Date(this.value$.value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
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
    /**
     * @param {?} hour
     * @return {?}
     */
    getMeridianTime(hour) {
        return hour > 12 ? hour - 12 : hour;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    setHour(hour) {
        const /** @type {?} */ date = this.value;
        date.setHours(hour ? hour : 0);
        this.value = date;
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    setMinute(minute) {
        const /** @type {?} */ date = this.value;
        date.setMinutes(minute ? minute : 0);
        this.value = date;
    }
    /**
     * @param {?} seconds
     * @return {?}
     */
    setSeconds(seconds) {
        const /** @type {?} */ date = this.value;
        date.setSeconds(seconds ? seconds : 0);
        this.value = date;
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    incrementHour(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() + this.hourStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    decrementHour(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() - this.hourStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    incrementMinute(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() + this.minuteStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    decrementMinute(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() - this.minuteStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    incrementSecond(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() + this.secondStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    decrementSecond(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() - this.secondStep);
    }
    /**
     * @param {?} meridian
     * @return {?}
     */
    selectMeridian(meridian) {
        this._meridian = meridian;
        // get the current time
        const /** @type {?} */ hour = this.value.getHours();
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    checkValidity(date) {
        let /** @type {?} */ valid = true;
        if (this.min && date.getTime() <= this.min.getTime()) {
            valid = false;
        }
        if (this.max && date.getTime() >= this.max.getTime()) {
            valid = false;
        }
        return valid;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    hourChange(value) {
        // convert the string to a number
        let /** @type {?} */ hour = parseInt(value);
        let /** @type {?} */ currentHour = this.value.getHours();
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    minuteChange(value) {
        // convert the string to a number
        let /** @type {?} */ minute = parseInt(value);
        let /** @type {?} */ currentMinute = this.value.getMinutes();
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    secondChange(value) {
        // convert the string to a number
        let /** @type {?} */ second = parseInt(value);
        let /** @type {?} */ currentSecond = this.value.getSeconds();
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
    }
}
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
TimePickerComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRCxNQUFNLENBQUMsdUJBQU0sMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQVlGLE1BQU07SUFtREY7eUJBakQ4QixJQUFJOzBCQUNILElBQUk7d0JBQ04sS0FBSzt3QkFDTCxLQUFLOzRCQUVELEtBQUs7eUJBQ1IsSUFBSTsyQkFDRixJQUFJOzJCQUNKLEtBQUs7NEJBQ0osSUFBSTt3QkFFVCxDQUFDOzBCQUNDLENBQUM7MEJBQ0QsQ0FBQzt5QkFJQSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7MkJBY25CLElBQUksWUFBWSxFQUFRO3VCQUM1QixJQUFJLFlBQVksRUFBVztpQ0FFZixHQUFHLEVBQUUsSUFBSTtnQ0FDSCxHQUFHLEVBQUUsSUFBSTtzQkFFdEMsSUFBSSxlQUFlLENBQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQzs7cUJBR2xCLElBQUksQ0FBQyxNQUFN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QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDckI7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDckI7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQWU7UUFDdEIsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDckI7Ozs7O0lBRUQsYUFBYSxDQUFDLFdBQW9CLEtBQUs7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdkQ7Ozs7O0lBRUQsYUFBYSxDQUFDLFdBQW9CLEtBQUs7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdkQ7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxV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LENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDZDtZQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDZjtTQUNKOztRQUdELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzNEOzs7WUEzUkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLCt1R0FBMkM7Z0JBQzNDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDRixZQUFZLEVBQUUsYUFBYTtpQkFDOUI7YUFDSjs7Ozs7d0JBR0ksS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFFTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7dUJBRUwsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7a0JBRUwsS0FBSztrQkFDTCxLQUFLO3dCQUNMLEtBQUs7b0JBRUwsS0FBSzswQkFZTCxNQUFNO3NCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuZXhwb3J0IGNvbnN0IFRJTUVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdGltZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgaG9zdDoge1xuICAgICAgICAnYXJpYS1sYWJlbCc6ICdUaW1lIFBpY2tlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGFycm93a2V5czogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgbW91c2V3aGVlbDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2hvd01lcmlkaWFuOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd0hvdXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93TWludXRlczogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1NlY29uZHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93U3Bpbm5lcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgaG91clN0ZXA6IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgbWludXRlU3RlcDogbnVtYmVyID0gMTtcbiAgICBASW5wdXQoKSBzZWNvbmRTdGVwOiBudW1iZXIgPSAxO1xuXG4gICAgQElucHV0KCkgbWluOiBEYXRlO1xuICAgIEBJbnB1dCgpIG1heDogRGF0ZTtcbiAgICBASW5wdXQoKSBtZXJpZGlhbnM6IHN0cmluZ1tdID0gWydBTScsICdQTSddO1xuXG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMudmFsdWUkLm5leHQobmV3IERhdGUodmFsdWUpKTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUkLnZhbHVlKTtcblxuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSQudmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZSQudmFsdWUpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcbiAgICBAT3V0cHV0KCkgaXNWYWxpZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICAgIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBEYXRlKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuXG4gICAgdmFsdWUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlPihuZXcgRGF0ZSgpKTtcblxuICAgIC8vIGNyZWF0ZSBvYnNlcnZhYmxlcyB0aGF0IGFyZSBkZXJpdmVkIGZyb20gdGhlIGxhdGVzdCB2YWx1ZVxuICAgIGhvdXIkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLnZhbHVlJC5waXBlKG1hcChkYXRlID0+IGRhdGUuZ2V0SG91cnMoKSksIG1hcChob3VyID0+IHRoaXMuc2hvd01lcmlkaWFuID8gdGhpcy5nZXRNZXJpZGlhblRpbWUoaG91cikgOiBob3VyKSk7XG4gICAgbWludXRlJDogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy52YWx1ZSQucGlwZShtYXAoZGF0ZSA9PiBkYXRlLmdldE1pbnV0ZXMoKSkpO1xuICAgIHNlY29uZCQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMudmFsdWUkLnBpcGUobWFwKGRhdGUgPT4gZGF0ZS5nZXRTZWNvbmRzKCkpKTtcbiAgICBtZXJpZGlhbiQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMudmFsdWUkLnBpcGUobWFwKGRhdGUgPT4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyB0aGlzLm1lcmlkaWFuc1swXSA6IHRoaXMubWVyaWRpYW5zWzFdKSk7XG4gICAgdmFsaWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy52YWx1ZSQucGlwZShtYXAoZGF0ZSA9PiB0aGlzLmNoZWNrVmFsaWRpdHkoZGF0ZSkpKTtcblxuICAgIHByaXZhdGUgX21lcmlkaWFuOiBzdHJpbmcgPSB0aGlzLm1lcmlkaWFuc1swXTtcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnZhbGlkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZSh2YWxpZCA9PiB0aGlzLmlzVmFsaWQuZW1pdCh2YWxpZCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogRGF0ZSkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIGdldE1lcmlkaWFuVGltZShob3VyOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gaG91ciA+IDEyID8gaG91ciAtIDEyIDogaG91cjtcbiAgICB9XG5cbiAgICBzZXRIb3VyKGhvdXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgZGF0ZS5zZXRIb3Vycyhob3VyID8gaG91ciA6IDApO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgIH1cblxuICAgIHNldE1pbnV0ZShtaW51dGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSA/IG1pbnV0ZSA6IDApO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgIH1cblxuICAgIHNldFNlY29uZHMoc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBkYXRlLnNldFNlY29uZHMoc2Vjb25kcyA/IHNlY29uZHMgOiAwKTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRIb3VyKGFycm93a2V5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgYXJyb3drZXkgJiYgIXRoaXMuYXJyb3drZXlzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhvdXIodGhpcy52YWx1ZS5nZXRIb3VycygpICsgdGhpcy5ob3VyU3RlcCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50SG91cihhcnJvd2tleTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGFycm93a2V5ICYmICF0aGlzLmFycm93a2V5cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRIb3VyKHRoaXMudmFsdWUuZ2V0SG91cnMoKSAtIHRoaXMuaG91clN0ZXApO1xuICAgIH1cblxuICAgIGluY3JlbWVudE1pbnV0ZShhcnJvd2tleTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGFycm93a2V5ICYmICF0aGlzLmFycm93a2V5cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRNaW51dGUodGhpcy52YWx1ZS5nZXRNaW51dGVzKCkgKyB0aGlzLm1pbnV0ZVN0ZXApO1xuICAgIH1cblxuICAgIGRlY3JlbWVudE1pbnV0ZShhcnJvd2tleTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGFycm93a2V5ICYmICF0aGlzLmFycm93a2V5cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRNaW51dGUodGhpcy52YWx1ZS5nZXRNaW51dGVzKCkgLSB0aGlzLm1pbnV0ZVN0ZXApO1xuICAgIH1cblxuICAgIGluY3JlbWVudFNlY29uZChhcnJvd2tleTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGFycm93a2V5ICYmICF0aGlzLmFycm93a2V5cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWNvbmRzKHRoaXMudmFsdWUuZ2V0U2Vjb25kcygpICsgdGhpcy5zZWNvbmRTdGVwKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRTZWNvbmQoYXJyb3drZXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBhcnJvd2tleSAmJiAhdGhpcy5hcnJvd2tleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2Vjb25kcyh0aGlzLnZhbHVlLmdldFNlY29uZHMoKSAtIHRoaXMuc2Vjb25kU3RlcCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TWVyaWRpYW4obWVyaWRpYW46IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXJpZGlhbiA9IG1lcmlkaWFuO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIGNvbnN0IGhvdXIgPSB0aGlzLnZhbHVlLmdldEhvdXJzKCk7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBzZWxlY3RlZCBBTVxuICAgICAgICBpZiAobWVyaWRpYW4gPT09IHRoaXMubWVyaWRpYW5zWzBdKSB7XG4gICAgICAgICAgICBpZiAoaG91ciA+PSAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SG91cihob3VyIC0gMTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBzZWxlY3RlZCBQTVxuICAgICAgICBpZiAobWVyaWRpYW4gPT09IHRoaXMubWVyaWRpYW5zWzFdKSB7XG4gICAgICAgICAgICBpZiAoaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIb3VyKGhvdXIgKyAxMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1ZhbGlkaXR5KGRhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5taW4gJiYgZGF0ZS5nZXRUaW1lKCkgPD0gdGhpcy5taW4uZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4ICYmIGRhdGUuZ2V0VGltZSgpID49IHRoaXMubWF4LmdldFRpbWUoKSkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG5cbiAgICBob3VyQ2hhbmdlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgICAgICAvLyBjb252ZXJ0IHRoZSBzdHJpbmcgdG8gYSBudW1iZXJcbiAgICAgICAgbGV0IGhvdXIgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGxldCBjdXJyZW50SG91ciA9IHRoaXMudmFsdWUuZ2V0SG91cnMoKTtcblxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaGFzbid0IGNoYW5nZWQsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGhvdXIgPT09IGN1cnJlbnRIb3VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGhvdXJzIGlzIHZhbGlkXG4gICAgICAgIGlmICghaXNOYU4oaG91cikpIHtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMCkge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaG91ciA+ICh0aGlzLnNob3dNZXJpZGlhbiA/IDEyIDogMjMpKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IHRoaXMuc2hvd01lcmlkaWFuID8gMTIgOiAyMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhvdXIgPSBpc05hTihob3VyKSA/IGN1cnJlbnRIb3VyIDogaG91cjtcblxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVyIGlzIGludmFsaWQgdGhlbiByZXN0b3JlIGl0IHRvIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5fbWVyaWRpYW4gPT09IHRoaXMubWVyaWRpYW5zWzBdKSB7XG4gICAgICAgICAgICBpZiAoaG91ciA+PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgLT0gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIHNlbGVjdGVkIFBNXG4gICAgICAgIGlmICh0aGlzLl9tZXJpZGlhbiA9PT0gdGhpcy5tZXJpZGlhbnNbMV0pIHtcbiAgICAgICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRIb3VyKGhvdXIpO1xuICAgIH1cblxuICAgIG1pbnV0ZUNoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCB0aGUgc3RyaW5nIHRvIGEgbnVtYmVyXG4gICAgICAgIGxldCBtaW51dGUgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgIGxldCBjdXJyZW50TWludXRlID0gdGhpcy52YWx1ZS5nZXRNaW51dGVzKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGhhc24ndCBjaGFuZ2VkLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChtaW51dGUgPT09IGN1cnJlbnRNaW51dGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgaG91cnMgaXMgdmFsaWRcbiAgICAgICAgaWYgKCFpc05hTihtaW51dGUpKSB7XG4gICAgICAgICAgICBpZiAobWludXRlIDwgMCkge1xuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDU5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWludXRlID4gNTkpIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBpcyBpbnZhbGlkIHRoZW4gcmVzdG9yZSBpdCB0byB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICAgdGhpcy5zZXRNaW51dGUoaXNOYU4obWludXRlKSA/IGN1cnJlbnRNaW51dGUgOiBtaW51dGUpO1xuICAgIH1cblxuICAgIHNlY29uZENoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIHN0cmluZyB0byBhIG51bWJlclxuICAgICAgICBsZXQgc2Vjb25kID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBsZXQgY3VycmVudFNlY29uZCA9IHRoaXMudmFsdWUuZ2V0U2Vjb25kcygpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBoYXNuJ3QgY2hhbmdlZCwgZG8gbm90aGluZ1xuICAgICAgICBpZiAoc2Vjb25kID09PSBjdXJyZW50U2Vjb25kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGhvdXJzIGlzIHZhbGlkXG4gICAgICAgIGlmICghaXNOYU4oc2Vjb25kKSkge1xuICAgICAgICAgICAgaWYgKHNlY29uZCA8IDApIHtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Vjb25kID4gNTkpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSA1OTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBudW1iZXIgaXMgaW52YWxpZCB0aGVuIHJlc3RvcmUgaXQgdG8gdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0U2Vjb25kcyhpc05hTihzZWNvbmQpID8gY3VycmVudFNlY29uZCA6IHNlY29uZCk7XG4gICAgfVxufSJdfQ==