import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TIME_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
};

@Component({
    selector: 'ux-time-picker',
    templateUrl: './time-picker.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TIME_PICKER_VALUE_ACCESSOR],
    host: {
        'aria-label': 'Time Picker'
    }
})
export class TimePickerComponent implements ControlValueAccessor {

    /** Whether the arrow keys can be used to increment or decrement the selected time component. */
    @Input() arrowkeys: boolean = true;

    /** Whether the mouse scroll wheel can be used to increment or decrement the selected time component. */
    @Input() mousewheel: boolean = true;

    /** Whether the control is disabled. */
    @Input() disabled: boolean = false;

    /** Whether the control is readonly. */
    @Input() readOnly: boolean = false;

    /** Whether to show the meridian (AM/PM) selector. If this is false, the 24-hour clock will be used. */
    @Input() showMeridian: boolean = false;

    /** Whether to show the hour selector. */
    @Input() showHours: boolean = true;

    /** Whether to show the minute selector. */
    @Input() showMinutes: boolean = true;

    /** Whether to show the second selector. */
    @Input() showSeconds: boolean = false;

    /** Whether to show increment and decrement buttons in the time picker. */
    @Input() showSpinners: boolean = true;

    /** The number of hours to increment or decrement by when using the spinner buttons, arrow keys, or mouse scroll wheel. */
    @Input() hourStep: number = 1;

    /** The number of minutes to increment or decrement by when using the spinner buttons, arrow keys, or mouse scroll wheel. */
    @Input() minuteStep: number = 1;

    /** The number of seconds to increment or decrement by when using the spinner buttons, arrow keys, or mouse scroll wheel. */
    @Input() secondStep: number = 1;

    /** The minimum value that the component will allow. */
    @Input() min: Date;

    /** The maximum value that the component will allow. */
    @Input() max: Date;

    /** An array containing the labels to show in the meridian selector. */
    @Input() meridians: string[] = ['AM', 'PM'];

    /** The value to display. */
    @Input() set value(value: Date) {
        this._value = new Date(value);
        this.valueChange.emit(this._value);

        this.onChangeCallback(this._value);
        this.onTouchedCallback();
    }

    get value(): Date {
        return new Date(this._value);
    }

    get _meridian(): string {
        return this._value.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    }

    get _valid(): boolean {
        return this.checkValidity(this._value);
    }

    /** Emitted when the `value` changes. */
    @Output() valueChange = new EventEmitter<Date>();

    /** Emitted when the validity of the control changes. */
    @Output() isValid = new EventEmitter<boolean>();

    onTouchedCallback: () => void = () => {};
    onChangeCallback: (_: Date) => void = () => {};

    private _value = new Date();
    private _isValid: boolean = true;

    writeValue(value: Date): void {
        this.value = value;
    }

    registerOnChange(fn: (_: Date) => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    getMeridianTime(hour: number): number {
        return hour > 12 ? hour - 12 : hour;
    }

    setHour(hour: number): void {
        const date = this.value;
        date.setHours(hour ? hour : 0);

        this.value = date;
    }

    setMinute(minute: number): void {
        const date = this.value;
        date.setMinutes(minute ? minute : 0);

        this.value = date;
    }

    setSeconds(seconds: number): void {
        const date = this.value;
        date.setSeconds(seconds ? seconds : 0);

        this.value = date;
    }

    incrementHour(arrowkey: boolean = false): void {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }

        this.setHour(this.value.getHours() + this.hourStep);
    }

    decrementHour(arrowkey: boolean = false): void {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }

        this.setHour(this.value.getHours() - this.hourStep);
    }

    incrementMinute(arrowkey: boolean = false): void {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }

        this.setMinute(this.value.getMinutes() + this.minuteStep);
    }

    decrementMinute(arrowkey: boolean = false): void {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }

        this.setMinute(this.value.getMinutes() - this.minuteStep);
    }

    incrementSecond(arrowkey: boolean = false): void {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }

        this.setSeconds(this.value.getSeconds() + this.secondStep);
    }

    decrementSecond(arrowkey: boolean = false): void {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }

        this.setSeconds(this.value.getSeconds() - this.secondStep);
    }

    selectMeridian(meridian: string): void {

        // get the current time
        const hour = this.value.getHours();

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

    checkValidity(date: Date): boolean {
        let valid = true;

        // Fix min and max date components in order to compare time only
        const min = this.normalizeDate(this.min, date);
        const max = this.normalizeDate(this.max, date);

        if ((min && date.getTime() < min.getTime()) || (max && date.getTime() > max.getTime())) {
            valid = false;
        }

        // if the valid state has changed then emit the isValid output
        if (valid !== this._isValid) {
            this._isValid = valid;
            this.isValid.emit(valid);
        }

        return valid;
    }

    hourChange(value: string): void {

        // if the value is empty then emit nothing
        if (value && value.trim() === '') {
            return;
        }

        // convert the string to a number
        let hour = parseInt(value);

        // ensure the hours is valid
        if (!isNaN(hour)) {
            if (hour < 0) {
                hour = 0;
            }

            if (hour > (this.showMeridian ? 12 : 23)) {
                hour = this.showMeridian ? 12 : 23;
            }
        }

        const currentHour = this.value.getHours();
        
        // if the value hasn't changed, do nothing
        if (hour === currentHour) {
            return;
        }

        hour = isNaN(hour) ? currentHour : hour;

        if (this.showMeridian) {

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
        }

        this.setHour(hour);
    }

    minuteChange(value: string): void {

        // convert the string to a number
        let minute = parseInt(value);
        const currentMinute = this.value.getMinutes();

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

    secondChange(value: string): void {

        // convert the string to a number
        let second = parseInt(value);
        const currentSecond = this.value.getSeconds();

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

    /** Normalise a date's year/month/date components. */
    private normalizeDate(date: Date, reference: Date): Date {
        if (!date) {
            return null;
        }

        const normalized = new Date(date);
        normalized.setFullYear(reference.getFullYear());
        normalized.setMonth(reference.getMonth());
        normalized.setDate(reference.getDate());

        return normalized;
    }
}
