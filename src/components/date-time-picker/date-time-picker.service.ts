import { WeekDay } from '@angular/common';
import { Injectable, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { DateTimePickerConfig } from './date-time-picker.config';
import { dateComparator, DateTimePickerTimezone, meridians, months, monthsShort, timezones, weekdaysShort } from './date-time-picker.utils';

@Injectable()
export class DateTimePickerService implements OnDestroy {

    mode$: BehaviorSubject<DatePickerMode> = new BehaviorSubject<DatePickerMode>(DatePickerMode.Day);
    date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    timezone$ = new BehaviorSubject<DateTimePickerTimezone>(this.getCurrentTimezone());
    selected$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

    // the month and year to display in the viewport
    month$: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getMonth());
    year$: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getFullYear());

    showDate$ = new BehaviorSubject<boolean>(this._config ? this._config.showDate : true);
    showTime$ = new BehaviorSubject<boolean>(this._config ? this._config.showTime : true);
    showTimezone$ = new BehaviorSubject<boolean>(this._config ? this._config.showTimezone : true);
    showSeconds$ = new BehaviorSubject<boolean>(this._config ? this._config.showSeconds : false);
    showMeridian$ = new BehaviorSubject<boolean>(this._config ? this._config.showMeridian : true);
    showSpinners$ = new BehaviorSubject<boolean>(this._config ? this._config.showSpinners : true);
    showNowBtn$ = new BehaviorSubject<boolean>(this._config ? this._config.showNowBtn : true);
    weekdays$ = new BehaviorSubject<string[]>(this._config ? this._config.weekdays : weekdaysShort);
    nowBtnText$ = new BehaviorSubject<string>(this._config ? this._config.nowBtnText : 'Today');
    timezones$ = new BehaviorSubject<DateTimePickerTimezone[]>(this._config ? this._config.timezones : timezones);
    min$ = new BehaviorSubject<Date>(this._config ? this._config.min : null);
    max$ = new BehaviorSubject<Date>(this._config ? this._config.max : null);

    header$ = new BehaviorSubject<string>(null);
    headerEvent$ = new Subject<DatePickerHeaderEvent>();
    modeDirection: ModeDirection = ModeDirection.None;
    startOfWeek$ = new BehaviorSubject<WeekDay>(WeekDay.Sunday);

    months: string[] = this._config ? this._config.months : months;
    monthsShort: string[] = this._config ? this._config.monthsShort : monthsShort;
    meridians: string[] = this._config ? this._config.meridians : meridians;

    hours: number;
    minutes: number;
    seconds: number;

    yearRange: YearRange;

    /**
     * Store whether or not the component has fully initialised or not. We use this to prevent initial
     * focus on the end date range picker when the popover is first opened
     */
    initialised: boolean = false;

    private _subscription: Subscription;

    constructor(@Optional() private _config: DateTimePickerConfig) {

        // when the active date changes set the currently selected date
        this._subscription = this.selected$.subscribe(date => {

            // the month and year displayed in the viewport should reflect the newly selected items
            if (date instanceof Date) {
                this.setViewportMonth(date.getMonth());
                this.setViewportYear(date.getFullYear());
            }

            // emit the new date to the component host but only if they are different
            if (!dateComparator(date, this.selected$.value)) {
                this.date$.next(date);
            }
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    setViewportMonth(month: number): void {
        if (month < 0) {
            this.month$.next(11);
            this.year$.next(this.year$.value - 1);
        } else if (month > 11) {
            this.month$.next(0);
            this.year$.next(this.year$.value + 1);
        } else {
            this.month$.next(month);
        }
    }

    setViewportYear(year: number): void {
        this.year$.next(year);
    }

    setDate(day: number, month: number, year: number, hours?: number, minutes?: number, seconds?: number): void {
        const date = new Date(this.selected$.value);

        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);

        if (hours !== undefined) {
            date.setHours(hours);
        }

        if (minutes !== undefined) {
            date.setMinutes(minutes);
        }

        if (seconds !== undefined) {
            date.setSeconds(seconds);
        }

        if (this.isInRange(date)) {
            this.selected$.next(date);
        }
    }

    setDateToNow(): void {
        const now = new Date();
        if (this.isInRange(now)) {
            this.selected$.next(now);
        }
    }

    setViewportMode(mode: DatePickerMode): void {
        this.mode$.next(mode);
    }

    goToChildMode(): void {
        this.modeDirection = ModeDirection.Descend;

        switch (this.mode$.value) {

            case DatePickerMode.Year:
                return this.setViewportMode(DatePickerMode.Month);

            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Day);
        }
    }

    goToParentMode(): void {
        this.modeDirection = ModeDirection.Ascend;

        switch (this.mode$.value) {

            case DatePickerMode.Day:
                return this.setViewportMode(DatePickerMode.Month);

            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Year);
        }
    }

    goToNext(): void {
        this.headerEvent$.next(DatePickerHeaderEvent.Next);
    }

    goToPrevious(): void {
        this.headerEvent$.next(DatePickerHeaderEvent.Previous);
    }

    setHeader(header: string): void {
        this.header$.next(header);
    }

    getCurrentTimezone(): DateTimePickerTimezone {
        const offset = this.timezone$ ? this.timezone$.value.offset : new Date().getTimezoneOffset();
        const zones = this.timezones$ ? this.timezones$.value : timezones;
        const matchingZone = zones.find(timezone => timezone.offset === offset);
        if (matchingZone) {
            return matchingZone;
        } else {
            return zones.find(timezone => timezone.offset === 0) || { name: 'GMT', offset: 0 };
        }
    }

    setTimezone(timezone: DateTimePickerTimezone): void {
        this.timezone$.next(timezone);
    }

    isInRange(date: Date): boolean {
        return (!this.min$.value || date >= this.min$.value) && (!this.max$.value || date <= this.max$.value);
    }
}

export enum DatePickerMode {
    Day,
    Month,
    Year
}

export enum ModeDirection {
    None,
    Ascend,
    Descend
}

export enum DatePickerHeaderEvent {
    Previous,
    Next
}

export interface YearRange {
    start: number;
    end: number;
    range: number[];
}