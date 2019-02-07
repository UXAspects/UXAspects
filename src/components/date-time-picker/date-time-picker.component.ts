import { WeekDay } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { HasFocusIndicatorCtor, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../common/index';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, DateTimePickerTimezone, timezoneComparator } from './date-time-picker.utils';

// Boilerplate for applying mixins to DateTimePickerComponent.
export class DateTimePickerComponentBase { }

// Add all focus indicator properties to a new base class
export const _DateTimePickerMixinBase: HasFocusIndicatorCtor & typeof DateTimePickerComponentBase = mixinFocusIndicator(DateTimePickerComponentBase);

@Component({
    selector: 'ux-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    providers: [DateTimePickerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: [..._HasFocusIndicatorInputs]
})
export class DateTimePickerComponent implements OnDestroy {

    /** Defines whether or not the date picker should be visible. */
    @Input() set showDate(value: boolean) {
        this.datepicker.showDate$.next(value);
    }

    /** Defines whether or not the time picker should be visible. */
    @Input() set showTime(value: boolean) {
        this.datepicker.showTime$.next(value);
    }

    /** Defines whether or not the time picker should allow the user to choose a timezone. */
    @Input() set showTimezone(value: boolean) {
        this.datepicker.showTimezone$.next(value);
    }

    /** Defines whether or not the time picker should allow the user to specify seconds. */
    @Input() set showSeconds(value: boolean) {
        this.datepicker.showSeconds$.next(value);
    }

    /** Defines whether or not the time picker should show an AM/PM button, or time should be represented in 24hr format instead. */
    @Input() set showMeridian(value: boolean) {
        this.datepicker.showMeridian$.next(value);
    }

    /** Defines whether or not the time picker should allow the user to select the time using spinners. */
    @Input() set showSpinners(value: boolean) {
        this.datepicker.showSpinners$.next(value);
    }

    /** If defined will override the weekday names displayed. */
    @Input() set weekdays(value: string[]) {
        this.datepicker.weekdays$.next(value);
    }

    /** Defines the names of the months. */
    @Input() set months(months: string[]) {
        this.datepicker.months = months;
    }

    /** Defines the short names of each month. */
    @Input() set monthsShort(months: string[]) {
        this.datepicker.monthsShort = months;
    }

    /** Defines the labels to show in the meridian (AM/PM) selector. */
    @Input() set meridians(meridians: string[]) {
        this.datepicker.meridians = meridians;
    }

    /** Defines the text to be displayed in the button used to set the selected time to the current time. */
    @Input() set nowBtnText(value: string) {
        this.datepicker.nowBtnText$.next(value);
    }

    /**
     * Defines the list of available timezones. The **DateTimePickerTimezone** interface specifies that each timezone should
     * be an object with a **name** property that represents the timezone, eg. `GMT+2`, and an **offset** property that represents
     * the number of minutes relative to GMT the timezone is.
     */
    @Input() set timezones(value: DateTimePickerTimezone[]) {
        this.datepicker.timezones$.next(value);
    }

    /** Defines the day of the week that should appear in the first column. `WeekDay` is an enumeration available in `@angular/common`. */
    @Input() set startOfWeek(startOfWeek: WeekDay) {
        this.datepicker.startOfWeek$.next(startOfWeek);
    }

    /** Emits an event when the date is changed using the component. */
    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    /** If not defined the picker will try to use the user's timezone. If that is not available, it will revert to GMT. */
    @Output() timezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

    /** The selected date to be displayed in the component. */
    @Input()
    set date(value: Date) {
        if (!dateComparator(value, this.datepicker.selected$.value)) {
            this.datepicker.selected$.next(new Date(value));
        }
    }

    /** Will set the selected timezone. */
    @Input()
    set timezone(value: DateTimePickerTimezone) {
        this.datepicker.timezone$.next(value);
    }

    // expose enum to view
    DatePickerMode = DatePickerMode;

    private _onDestroy = new Subject<void>();

    constructor(public datepicker: DateTimePickerService) {
        datepicker.selected$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(dateComparator))
            .subscribe(date => this.dateChange.emit(date));

        datepicker.timezone$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(timezoneComparator))
            .subscribe((timezone: DateTimePickerTimezone) => this.timezoneChange.emit(timezone));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Change the date to the current date and time
     */
    setToNow(): void {

        // set the date to the current moment
        this.datepicker.setDateToNow();
    }
}