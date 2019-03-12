import { WeekDay } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DateRangeOptions } from '../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../date-range-picker/date-range.service';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, DateTimePickerTimezone, timezoneComparator } from './date-time-picker.utils';

@Component({
    selector: 'ux-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    providers: [DateTimePickerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements AfterViewInit, OnDestroy {

    /** Defines whether or not the date picker should be visible. */
    @Input() set showDate(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showDate$.next(value);
        }
    }

    /** Defines whether or not the time picker should be visible. */
    @Input() set showTime(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showTime$.next(value);
        }
    }

    /** Defines whether or not the time picker should allow the user to choose a timezone. */
    @Input() set showTimezone(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showTimezone$.next(value);
        }
    }

    /** Defines whether or not the time picker should allow the user to specify seconds. */
    @Input() set showSeconds(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showSeconds$.next(value);
        }
    }

    /** Defines whether or not the time picker should show an AM/PM button, or time should be represented in 24hr format instead. */
    @Input() set showMeridian(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showMeridian$.next(value);
        }
    }

    /** Defines whether or not the time picker should allow the user to select the time using spinners. */
    @Input() set showSpinners(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showSpinners$.next(value);
        }
    }

    /** If defined will override the weekday names displayed. */
    @Input() set weekdays(value: string[]) {
        if (value !== undefined) {
            this.datepicker.weekdays$.next(value);
        }
    }

    /** Defines the names of the months. */
    @Input() set months(months: string[]) {
        if (months !== undefined) {
            this.datepicker.months = months;
        }
    }

    /** Defines the short names of each month. */
    @Input() set monthsShort(months: string[]) {
        if (months !== undefined) {
            this.datepicker.monthsShort = months;
        }
    }

    /** Defines the labels to show in the meridian (AM/PM) selector. */
    @Input() set meridians(meridians: string[]) {
        if (meridians !== undefined) {
            this.datepicker.meridians = meridians;
        }
    }

    /** Defines the text to be displayed in the button used to set the selected time to the current time. */
    @Input() set nowBtnText(value: string) {
        if (value !== undefined) {
            this.datepicker.nowBtnText$.next(value);
        }
    }

    /** Specify whether or not to show the show now button */
    @Input() set showNowBtn(value: boolean) {
        if (value !== undefined) {
            this.datepicker.showNowBtn$.next(value);
        }
    }

    /**
     * Defines the list of available timezones. The `DateTimePickerTimezone` interface specifies that each timezone should
     * be an object with a `name` property that represents the timezone, eg. `GMT+2`, and an `offset` property that represents
     * the number of minutes relative to GMT the timezone is.
     */
    @Input() set timezones(value: DateTimePickerTimezone[]) {
        if (value !== undefined) {
            this.datepicker.timezones$.next(value);
        }
    }

    /** Defines the day of the week that should appear in the first column. `WeekDay` is an enumeration available in `@angular/common`. */
    @Input() set startOfWeek(startOfWeek: WeekDay) {
        if (startOfWeek !== undefined) {
            this.datepicker.startOfWeek$.next(startOfWeek);
        }
    }

    /** Define the aria label for the now button */
    @Input() nowBtnAriaLabel: string = 'Set date to now';

    /** Emits an event when the date is changed using the component. */
    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    /** If not defined the picker will try to use the user's timezone. If that is not available, it will revert to GMT. */
    @Output() timezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

    /** The selected date to be displayed in the component. */
    @Input()
    set date(value: Date) {
        if (value && !dateComparator(value, this.datepicker.selected$.value)) {
            this.datepicker.selected$.next(new Date(value));
        }
    }

    /** Will set the selected timezone. */
    @Input()
    set timezone(value: DateTimePickerTimezone) {
        if (value !== undefined) {
            this.datepicker.timezone$.next(value);
        }
    }

    /** The earliest selectable date. */
    @Input()
    set min(value: Date) {
        this.datepicker.min$.next(value);
    }

    /** The latest selectable date. */
    @Input()
    set max(value: Date) {
        this.datepicker.max$.next(value);
    }

    /** Determine if we are in range selection mode */
    get _isRangeMode(): boolean {
        return !!this._rangeOptions;
    }

    /** Determine if this picker is the start picker */
    get _isRangeStart(): boolean {
        return this._isRangeMode && this._rangeOptions.picker === DateRangePicker.Start;
    }

    /** Determine if this picker is the end picker */
    get _isRangeEnd(): boolean {
        return this._isRangeMode && this._rangeOptions.picker === DateRangePicker.End;
    }

    // expose enum to view
    DatePickerMode = DatePickerMode;

    private _onDestroy = new Subject<void>();

    constructor(
        public datepicker: DateTimePickerService,
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions) {

        datepicker.selected$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(dateComparator))
            .subscribe(date => this.dateChange.emit(date));

        datepicker.timezone$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(timezoneComparator))
            .subscribe((timezone: DateTimePickerTimezone) => this.timezoneChange.emit(timezone));
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.datepicker.initialised = true);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Change the date to the current date and time
     */
    setToNow(): void {

        if (this._isRangeMode) {
            const date = new Date();

            if (this._isRangeStart && !this._rangeService.showTime) {
                this.datepicker.setDate(date.getDate(), date.getMonth(), date.getFullYear(), 0, 0, 0);
            } else if (this._isRangeEnd && !this._rangeService.showTime) {
                this.datepicker.setDate(date.getDate(), date.getMonth(), date.getFullYear(), 23, 59, 59);
            } else {
                this.datepicker.setDate(date.getDate(), date.getMonth(), date.getFullYear(), this.datepicker.hours, this.datepicker.minutes, this.datepicker.seconds);
            }
        } else {
            // set the date to the current moment
            this.datepicker.setDateToNow();
        }
    }
}