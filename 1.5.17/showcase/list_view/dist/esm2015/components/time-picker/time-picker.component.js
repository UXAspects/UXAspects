/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef } from '@angular/core';
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
                template: `<div class="time-picker" aria-label="Time picker">

    <div class="time-picker-column" [class.has-error]="!(valid$ | async)" *ngIf="showHours">

        <ux-spin-button
            type="number"
            class="time-spinner"
            placeholder="HH"
            [min]="0"
            [max]="showMeridian ? 12 : 23"
            [value]="hour$ | async | timeFormat"
            (valueChange)="hourChange($event)"
            [spinners]="showSpinners"
            [disabled]="disabled"
            [readOnly]="readOnly"
            inputAriaLabel="hour"
            incrementAriaLabel="Increment the hour"
            decrementAriaLabel="Decrement the hour"
            (increment)="incrementHour()"
            (decrement)="decrementHour()">
        </ux-spin-button>

    </div>

    <div class="time-picker-separator" *ngIf="showMinutes">:</div>

    <div class="time-picker-column" [class.has-error]="!(valid$ | async)" *ngIf="showMinutes">

        <ux-spin-button
            type="number"
            class="time-spinner"
            placeholder="MM"
            [min]="0"
            [max]="59"
            [value]="minute$ | async | timeFormat"
            (valueChange)="minuteChange($event)"
            [spinners]="showSpinners"
            [disabled]="disabled"
            [readOnly]="readOnly"
            inputAriaLabel="minute"
            incrementAriaLabel="Increment the minute"
            decrementAriaLabel="Decrement the minute"
            (increment)="incrementMinute()"
            (decrement)="decrementMinute()">
        </ux-spin-button>

    </div>

    <div class="time-picker-separator" *ngIf="showSeconds">:</div>

    <div class="time-picker-column" [class.has-error]="!(valid$ | async)" *ngIf="showSeconds">

        <ux-spin-button
            type="number"
            class="time-spinner"
            type="number"
            placeholder="SS"
            [min]="0"
            [max]="59"
            [value]="second$ | async | timeFormat"
            (valueChange)="secondChange($event)"
            [spinners]="showSpinners"
            [disabled]="disabled"
            [readOnly]="readOnly"
            inputAriaLabel="seconds"
            incrementAriaLabel="Increment the second"
            decrementAriaLabel="Decrement the second"
            (increment)="incrementSecond()"
            (decrement)="decrementSecond()">
        </ux-spin-button>

    </div>
</div>

<div class="time-picker-meridian" *ngIf="showMeridian">

    <div class="btn-group" role="radiogroup">

        <button class="btn button-toggle-accent"
                *ngFor="let meridian of meridians"
                role="radio"
                tabindex="0"
                [disabled]="disabled"
                (click)="selectMeridian(meridian)"
                [class.active]="meridian === (meridian$ | async)"
                [attr.aria-label]="meridian"
                [attr.aria-checked]="meridian === (meridian$ | async)"
                [attr.aria-disabled]="disabled">
                {{ meridian }}
        </button>

    </div>
</div>`,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [TIME_PICKER_VALUE_ACCESSOR],
                host: {
                    'aria-label': 'Time Picker'
                }
            },] },
];
/** @nocollapse */
TimePickerComponent.ctorParameters = () => [];
TimePickerComponent.propDecorators = {
    "arrowkeys": [{ type: Input },],
    "mousewheel": [{ type: Input },],
    "disabled": [{ type: Input },],
    "readOnly": [{ type: Input },],
    "showMeridian": [{ type: Input },],
    "showHours": [{ type: Input },],
    "showMinutes": [{ type: Input },],
    "showSeconds": [{ type: Input },],
    "showSpinners": [{ type: Input },],
    "hourStep": [{ type: Input },],
    "minuteStep": [{ type: Input },],
    "secondStep": [{ type: Input },],
    "min": [{ type: Input },],
    "max": [{ type: Input },],
    "meridians": [{ type: Input },],
    "value": [{ type: Input },],
    "valueChange": [{ type: Output },],
    "isValid": [{ type: Output },],
};
function TimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TimePickerComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRCxNQUFNLENBQUMsdUJBQU0sMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0sbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBd0dGLE1BQU07SUFtREY7eUJBakQ4QixJQUFJOzBCQUNILElBQUk7d0JBQ04sS0FBSzt3QkFDTCxLQUFLOzRCQUVELEtBQUs7eUJBQ1IsSUFBSTsyQkFDRixJQUFJOzJCQUNKLEtBQUs7NEJBQ0osSUFBSTt3QkFFVCxDQUFDOzBCQUNDLENBQUM7MEJBQ0QsQ0FBQzt5QkFJQSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7MkJBY25CLElBQUksWUFBWSxFQUFRO3VCQUM1QixJQUFJLFlBQVksRUFBVztpQ0FFZixTQUFTO2dDQUNILFNBQVM7c0JBRXRDLElBQUksZUFBZSxDQUFPLElBQUksSUFBSSxFQUFFLENBQUM7O3FCQUdsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFB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RyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBRUQsZUFBZSxDQUFDLFdBQW9CLEtBQUs7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQWdCO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDOztRQUcxQix1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHbkMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENB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USxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRGUDtnQkFDSCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO2dCQUN2QyxJQUFJLEVBQUU7b0JBQ0YsWUFBWSxFQUFFLGFBQWE7aUJBQzlCO2FBQ0o7Ozs7OzBCQUdJLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBRUwsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3lCQUVMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO29CQUVMLEtBQUs7b0JBQ0wsS0FBSzswQkFDTCxLQUFLO3NCQUVMLEtBQUs7NEJBWUwsTUFBTTt3QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBUSU1FX1BJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ0aW1lLXBpY2tlclwiIGFyaWEtbGFiZWw9XCJUaW1lIHBpY2tlclwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInRpbWUtcGlja2VyLWNvbHVtblwiIFtjbGFzcy5oYXMtZXJyb3JdPVwiISh2YWxpZCQgfCBhc3luYylcIiAqbmdJZj1cInNob3dIb3Vyc1wiPlxuXG4gICAgICAgIDx1eC1zcGluLWJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBjbGFzcz1cInRpbWUtc3Bpbm5lclwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkhIXCJcbiAgICAgICAgICAgIFttaW5dPVwiMFwiXG4gICAgICAgICAgICBbbWF4XT1cInNob3dNZXJpZGlhbiA/IDEyIDogMjNcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImhvdXIkIHwgYXN5bmMgfCB0aW1lRm9ybWF0XCJcbiAgICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJob3VyQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgW3NwaW5uZXJzXT1cInNob3dTcGlubmVyc1wiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW3JlYWRPbmx5XT1cInJlYWRPbmx5XCJcbiAgICAgICAgICAgIGlucHV0QXJpYUxhYmVsPVwiaG91clwiXG4gICAgICAgICAgICBpbmNyZW1lbnRBcmlhTGFiZWw9XCJJbmNyZW1lbnQgdGhlIGhvdXJcIlxuICAgICAgICAgICAgZGVjcmVtZW50QXJpYUxhYmVsPVwiRGVjcmVtZW50IHRoZSBob3VyXCJcbiAgICAgICAgICAgIChpbmNyZW1lbnQpPVwiaW5jcmVtZW50SG91cigpXCJcbiAgICAgICAgICAgIChkZWNyZW1lbnQpPVwiZGVjcmVtZW50SG91cigpXCI+XG4gICAgICAgIDwvdXgtc3Bpbi1idXR0b24+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXBpY2tlci1zZXBhcmF0b3JcIiAqbmdJZj1cInNob3dNaW51dGVzXCI+OjwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRpbWUtcGlja2VyLWNvbHVtblwiIFtjbGFzcy5oYXMtZXJyb3JdPVwiISh2YWxpZCQgfCBhc3luYylcIiAqbmdJZj1cInNob3dNaW51dGVzXCI+XG5cbiAgICAgICAgPHV4LXNwaW4tYnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIGNsYXNzPVwidGltZS1zcGlubmVyXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTU1cIlxuICAgICAgICAgICAgW21pbl09XCIwXCJcbiAgICAgICAgICAgIFttYXhdPVwiNTlcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cIm1pbnV0ZSQgfCBhc3luYyB8IHRpbWVGb3JtYXRcIlxuICAgICAgICAgICAgKHZhbHVlQ2hhbmdlKT1cIm1pbnV0ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtzcGlubmVyc109XCJzaG93U3Bpbm5lcnNcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtyZWFkT25seV09XCJyZWFkT25seVwiXG4gICAgICAgICAgICBpbnB1dEFyaWFMYWJlbD1cIm1pbnV0ZVwiXG4gICAgICAgICAgICBpbmNyZW1lbnRBcmlhTGFiZWw9XCJJbmNyZW1lbnQgdGhlIG1pbnV0ZVwiXG4gICAgICAgICAgICBkZWNyZW1lbnRBcmlhTGFiZWw9XCJEZWNyZW1lbnQgdGhlIG1pbnV0ZVwiXG4gICAgICAgICAgICAoaW5jcmVtZW50KT1cImluY3JlbWVudE1pbnV0ZSgpXCJcbiAgICAgICAgICAgIChkZWNyZW1lbnQpPVwiZGVjcmVtZW50TWludXRlKClcIj5cbiAgICAgICAgPC91eC1zcGluLWJ1dHRvbj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRpbWUtcGlja2VyLXNlcGFyYXRvclwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj46PC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidGltZS1waWNrZXItY29sdW1uXCIgW2NsYXNzLmhhcy1lcnJvcl09XCIhKHZhbGlkJCB8IGFzeW5jKVwiICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cblxuICAgICAgICA8dXgtc3Bpbi1idXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJ0aW1lLXNwaW5uZXJcIlxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNTXCJcbiAgICAgICAgICAgIFttaW5dPVwiMFwiXG4gICAgICAgICAgICBbbWF4XT1cIjU5XCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJzZWNvbmQkIHwgYXN5bmMgfCB0aW1lRm9ybWF0XCJcbiAgICAgICAgICAgICh2YWx1ZUNoYW5nZSk9XCJzZWNvbmRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbc3Bpbm5lcnNdPVwic2hvd1NwaW5uZXJzXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbcmVhZE9ubHldPVwicmVhZE9ubHlcIlxuICAgICAgICAgICAgaW5wdXRBcmlhTGFiZWw9XCJzZWNvbmRzXCJcbiAgICAgICAgICAgIGluY3JlbWVudEFyaWFMYWJlbD1cIkluY3JlbWVudCB0aGUgc2Vjb25kXCJcbiAgICAgICAgICAgIGRlY3JlbWVudEFyaWFMYWJlbD1cIkRlY3JlbWVudCB0aGUgc2Vjb25kXCJcbiAgICAgICAgICAgIChpbmNyZW1lbnQpPVwiaW5jcmVtZW50U2Vjb25kKClcIlxuICAgICAgICAgICAgKGRlY3JlbWVudCk9XCJkZWNyZW1lbnRTZWNvbmQoKVwiPlxuICAgICAgICA8L3V4LXNwaW4tYnV0dG9uPlxuXG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInRpbWUtcGlja2VyLW1lcmlkaWFuXCIgKm5nSWY9XCJzaG93TWVyaWRpYW5cIj5cblxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiByb2xlPVwicmFkaW9ncm91cFwiPlxuXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnV0dG9uLXRvZ2dsZS1hY2NlbnRcIlxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBtZXJpZGlhbiBvZiBtZXJpZGlhbnNcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RNZXJpZGlhbihtZXJpZGlhbilcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwibWVyaWRpYW4gPT09IChtZXJpZGlhbiQgfCBhc3luYylcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibWVyaWRpYW5cIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJtZXJpZGlhbiA9PT0gKG1lcmlkaWFuJCB8IGFzeW5jKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgIHt7IG1lcmlkaWFuIH19XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbVElNRV9QSUNLRVJfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiAnVGltZSBQaWNrZXInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBhcnJvd2tleXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIG1vdXNld2hlZWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dNZXJpZGlhbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dIb3VyczogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd01pbnV0ZXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dTZWNvbmRzOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd1NwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGhvdXJTdGVwOiBudW1iZXIgPSAxO1xuICAgIEBJbnB1dCgpIG1pbnV0ZVN0ZXA6IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgc2Vjb25kU3RlcDogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIG1pbjogRGF0ZTtcbiAgICBASW5wdXQoKSBtYXg6IERhdGU7XG4gICAgQElucHV0KCkgbWVyaWRpYW5zOiBzdHJpbmdbXSA9IFsnQU0nLCAnUE0nXTtcblxuICAgIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLnZhbHVlJC5uZXh0KG5ldyBEYXRlKHZhbHVlKSk7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlJC52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUkLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWUkLnZhbHVlKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG4gICAgQE91dHB1dCgpIGlzVmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogRGF0ZSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICAgIHZhbHVlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0ZT4obmV3IERhdGUoKSk7XG5cbiAgICAvLyBjcmVhdGUgb2JzZXJ2YWJsZXMgdGhhdCBhcmUgZGVyaXZlZCBmcm9tIHRoZSBsYXRlc3QgdmFsdWVcbiAgICBob3VyJDogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy52YWx1ZSQucGlwZShtYXAoZGF0ZSA9PiBkYXRlLmdldEhvdXJzKCkpLCBtYXAoaG91ciA9PiB0aGlzLnNob3dNZXJpZGlhbiA/IHRoaXMuZ2V0TWVyaWRpYW5UaW1lKGhvdXIpIDogaG91cikpO1xuICAgIG1pbnV0ZSQ6IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMudmFsdWUkLnBpcGUobWFwKGRhdGUgPT4gZGF0ZS5nZXRNaW51dGVzKCkpKTtcbiAgICBzZWNvbmQkOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLnZhbHVlJC5waXBlKG1hcChkYXRlID0+IGRhdGUuZ2V0U2Vjb25kcygpKSk7XG4gICAgbWVyaWRpYW4kOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLnZhbHVlJC5waXBlKG1hcChkYXRlID0+IGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gdGhpcy5tZXJpZGlhbnNbMF0gOiB0aGlzLm1lcmlkaWFuc1sxXSkpO1xuICAgIHZhbGlkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMudmFsdWUkLnBpcGUobWFwKGRhdGUgPT4gdGhpcy5jaGVja1ZhbGlkaXR5KGRhdGUpKSk7XG5cbiAgICBwcml2YXRlIF9tZXJpZGlhbjogc3RyaW5nID0gdGhpcy5tZXJpZGlhbnNbMF07XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy52YWxpZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKS5zdWJzY3JpYmUodmFsaWQgPT4gdGhpcy5pc1ZhbGlkLmVtaXQodmFsaWQpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IERhdGUpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXRNZXJpZGlhblRpbWUoaG91cjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGhvdXIgPiAxMiA/IGhvdXIgLSAxMiA6IGhvdXI7XG4gICAgfVxuXG4gICAgc2V0SG91cihob3VyOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGRhdGUuc2V0SG91cnMoaG91ciA/IGhvdXIgOiAwKTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBzZXRNaW51dGUobWludXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIGRhdGUuc2V0TWludXRlcyhtaW51dGUgPyBtaW51dGUgOiAwKTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBzZXRTZWNvbmRzKHNlY29uZHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKHNlY29uZHMgPyBzZWNvbmRzIDogMCk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgaW5jcmVtZW50SG91cihhcnJvd2tleTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGFycm93a2V5ICYmICF0aGlzLmFycm93a2V5cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRIb3VyKHRoaXMudmFsdWUuZ2V0SG91cnMoKSArIHRoaXMuaG91clN0ZXApO1xuICAgIH1cblxuICAgIGRlY3JlbWVudEhvdXIoYXJyb3drZXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBhcnJvd2tleSAmJiAhdGhpcy5hcnJvd2tleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SG91cih0aGlzLnZhbHVlLmdldEhvdXJzKCkgLSB0aGlzLmhvdXJTdGVwKTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRNaW51dGUoYXJyb3drZXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBhcnJvd2tleSAmJiAhdGhpcy5hcnJvd2tleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0TWludXRlKHRoaXMudmFsdWUuZ2V0TWludXRlcygpICsgdGhpcy5taW51dGVTdGVwKTtcbiAgICB9XG5cbiAgICBkZWNyZW1lbnRNaW51dGUoYXJyb3drZXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBhcnJvd2tleSAmJiAhdGhpcy5hcnJvd2tleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0TWludXRlKHRoaXMudmFsdWUuZ2V0TWludXRlcygpIC0gdGhpcy5taW51dGVTdGVwKTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnRTZWNvbmQoYXJyb3drZXk6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBhcnJvd2tleSAmJiAhdGhpcy5hcnJvd2tleXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2Vjb25kcyh0aGlzLnZhbHVlLmdldFNlY29uZHMoKSArIHRoaXMuc2Vjb25kU3RlcCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50U2Vjb25kKGFycm93a2V5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgYXJyb3drZXkgJiYgIXRoaXMuYXJyb3drZXlzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNlY29uZHModGhpcy52YWx1ZS5nZXRTZWNvbmRzKCkgLSB0aGlzLnNlY29uZFN0ZXApO1xuICAgIH1cblxuICAgIHNlbGVjdE1lcmlkaWFuKG1lcmlkaWFuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVyaWRpYW4gPSBtZXJpZGlhbjtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICBjb25zdCBob3VyID0gdGhpcy52YWx1ZS5nZXRIb3VycygpO1xuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgc2VsZWN0ZWQgQU1cbiAgICAgICAgaWYgKG1lcmlkaWFuID09PSB0aGlzLm1lcmlkaWFuc1swXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhvdXIoaG91ciAtIDEyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgc2VsZWN0ZWQgUE1cbiAgICAgICAgaWYgKG1lcmlkaWFuID09PSB0aGlzLm1lcmlkaWFuc1sxXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SG91cihob3VyICsgMTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tWYWxpZGl0eShkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMubWluICYmIGRhdGUuZ2V0VGltZSgpIDw9IHRoaXMubWluLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heCAmJiBkYXRlLmdldFRpbWUoKSA+PSB0aGlzLm1heC5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuXG4gICAgaG91ckNoYW5nZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY29udmVydCB0aGUgc3RyaW5nIHRvIGEgbnVtYmVyXG4gICAgICAgIGxldCBob3VyID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBsZXQgY3VycmVudEhvdXIgPSB0aGlzLnZhbHVlLmdldEhvdXJzKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHZhbHVlIGhhc24ndCBjaGFuZ2VkLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChob3VyID09PSBjdXJyZW50SG91cikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBob3VycyBpcyB2YWxpZFxuICAgICAgICBpZiAoIWlzTmFOKGhvdXIpKSB7XG4gICAgICAgICAgICBpZiAoaG91ciA8IDApIHtcbiAgICAgICAgICAgICAgICBob3VyID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhvdXIgPiAodGhpcy5zaG93TWVyaWRpYW4gPyAxMiA6IDIzKSkge1xuICAgICAgICAgICAgICAgIGhvdXIgPSB0aGlzLnNob3dNZXJpZGlhbiA/IDEyIDogMjM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBob3VyID0gaXNOYU4oaG91cikgPyBjdXJyZW50SG91ciA6IGhvdXI7XG5cbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBpcyBpbnZhbGlkIHRoZW4gcmVzdG9yZSBpdCB0byB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMuX21lcmlkaWFuID09PSB0aGlzLm1lcmlkaWFuc1swXSkge1xuICAgICAgICAgICAgaWYgKGhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyIC09IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBzZWxlY3RlZCBQTVxuICAgICAgICBpZiAodGhpcy5fbWVyaWRpYW4gPT09IHRoaXMubWVyaWRpYW5zWzFdKSB7XG4gICAgICAgICAgICBpZiAoaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SG91cihob3VyKTtcbiAgICB9XG5cbiAgICBtaW51dGVDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIHN0cmluZyB0byBhIG51bWJlclxuICAgICAgICBsZXQgbWludXRlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICBsZXQgY3VycmVudE1pbnV0ZSA9IHRoaXMudmFsdWUuZ2V0TWludXRlcygpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBoYXNuJ3QgY2hhbmdlZCwgZG8gbm90aGluZ1xuICAgICAgICBpZiAobWludXRlID09PSBjdXJyZW50TWludXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhlIGhvdXJzIGlzIHZhbGlkXG4gICAgICAgIGlmICghaXNOYU4obWludXRlKSkge1xuICAgICAgICAgICAgaWYgKG1pbnV0ZSA8IDApIHtcbiAgICAgICAgICAgICAgICBtaW51dGUgPSA1OTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1pbnV0ZSA+IDU5KSB7XG4gICAgICAgICAgICAgICAgbWludXRlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBudW1iZXIgaXMgaW52YWxpZCB0aGVuIHJlc3RvcmUgaXQgdG8gdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0TWludXRlKGlzTmFOKG1pbnV0ZSkgPyBjdXJyZW50TWludXRlIDogbWludXRlKTtcbiAgICB9XG5cbiAgICBzZWNvbmRDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvLyBjb252ZXJ0IHRoZSBzdHJpbmcgdG8gYSBudW1iZXJcbiAgICAgICAgbGV0IHNlY29uZCA9IHBhcnNlSW50KHZhbHVlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRTZWNvbmQgPSB0aGlzLnZhbHVlLmdldFNlY29uZHMoKTtcblxuICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaGFzbid0IGNoYW5nZWQsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHNlY29uZCA9PT0gY3VycmVudFNlY29uZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBob3VycyBpcyB2YWxpZFxuICAgICAgICBpZiAoIWlzTmFOKHNlY29uZCkpIHtcbiAgICAgICAgICAgIGlmIChzZWNvbmQgPCAwKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlY29uZCA+IDU5KSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gNTk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVyIGlzIGludmFsaWQgdGhlbiByZXN0b3JlIGl0IHRvIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgICAgICB0aGlzLnNldFNlY29uZHMoaXNOYU4oc2Vjb25kKSA/IGN1cnJlbnRTZWNvbmQgOiBzZWNvbmQpO1xuICAgIH1cbn0iXX0=