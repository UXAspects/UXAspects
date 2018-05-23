import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged, map } from 'rxjs/operators';

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
export class TimePickerComponent implements ControlValueAccessor, OnDestroy {

    @Input() arrowkeys: boolean = true;
    @Input() mousewheel: boolean = true;
    @Input() disabled: boolean = false;
    @Input() readOnly: boolean = false;

    @Input() showMeridian: boolean = false;
    @Input() showHours: boolean = true;
    @Input() showMinutes: boolean = true;
    @Input() showSeconds: boolean = false;
    @Input() showSpinners: boolean = true;

    @Input() hourStep: number = 1;
    @Input() minuteStep: number = 1;
    @Input() secondStep: number = 1;

    @Input() min: Date;
    @Input() max: Date;
    @Input() meridians: string[] = ['AM', 'PM'];

    @Input() set value(value: Date) {
        this.value$.next(new Date(value));
        this.valueChange.emit(this.value$.value);

        this.onChangeCallback(this.value$.value);
        this.onTouchedCallback();
    }

    get value(): Date {
        return new Date(this.value$.value);
    }

    @Output() valueChange = new EventEmitter<Date>();
    @Output() isValid = new EventEmitter<boolean>();

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: Date) => void = () => { };

    value$ = new BehaviorSubject<Date>(new Date());

    // create observables that are derived from the latest value
    hour$: Observable<number> = this.value$.pipe(map(date => date.getHours()), map(hour => this.showMeridian ? this.getMeridianTime(hour) : hour));
    minute$: Observable<number> = this.value$.pipe(map(date => date.getMinutes()));
    second$: Observable<number> = this.value$.pipe(map(date => date.getSeconds()));
    meridian$: Observable<string> = this.value$.pipe(map(date => date.getHours() < 12 ? this.meridians[0] : this.meridians[1]));
    valid$: Observable<boolean> = this.value$.pipe(map(date => this.checkValidity(date)));

    private _meridian: string = this.meridians[0];
    private _subscription: Subscription;

    constructor() {
        this._subscription = this.valid$.pipe(distinctUntilChanged()).subscribe(valid => this.isValid.emit(valid));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

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
        this._meridian = meridian;

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

        if (this.min && date.getTime() <= this.min.getTime()) {
            valid = false;
        }

        if (this.max && date.getTime() >= this.max.getTime()) {
            valid = false;
        }

        return valid;
    }

    hourChange(value: string): void {
        // convert the string to a number
        let hour = parseInt(value);
        let currentHour = this.value.getHours();

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
                this.setHour(hour - 12);
            }
        }

        // if we have selected PM
        if (this._meridian === this.meridians[1]) {
            if (hour < 12) {
                this.setHour(hour + 12);
            }
        }
    }

    minuteChange(value: string): void {
        // convert the string to a number
        let minute = parseInt(value);
        let currentMinute = this.value.getMinutes();

        // if the value hasn't changed, do nothing
        if (minute === currentMinute) {
            return;
        }

        // ensure the hours is valid
        if (!isNaN(minute)) {
            if (minute < 0) {
                minute = 0;
            }

            if (minute > 59) {
                minute = 59;
            }
        }

        // if the number is invalid then restore it to the previous value
        this.setMinute(isNaN(minute) ? currentMinute : minute);
    }

    secondChange(value: string): void {
        // convert the string to a number
        let second = parseInt(value);
        let currentSecond = this.value.getSeconds();

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