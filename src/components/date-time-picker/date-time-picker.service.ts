import { WeekDay } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DateTimePickerConfig } from './date-time-picker.config';
import { dateComparator, DateTimePickerTimezone, meridians, months, monthsShort, timezones, weekdaysShort } from './date-time-picker.utils';

@Injectable()
export class DateTimePickerService {

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
    weekdays$ = new BehaviorSubject<string[]>(this._config ? this._config.weekdays : weekdaysShort);
    nowBtnText$ = new BehaviorSubject<string>(this._config ? this._config.nowBtnText : 'Today');
    timezones$ = new BehaviorSubject<DateTimePickerTimezone[]>(this._config ? this._config.timezones : timezones);

    header$ = new BehaviorSubject<string>(null);
    headerEvent$ = new Subject<DatePickerHeaderEvent>();
    modeDirection: ModeDirection = ModeDirection.None;
    startOfWeek$ = new BehaviorSubject<WeekDay>(WeekDay.Sunday);

    months: string[] = this._config ? this._config.months : months;
    monthsShort: string[] = this._config ? this._config.monthsShort : monthsShort;
    meridians: string[] = this._config ? this._config.meridians : meridians;

    private _subscription: Subscription;

    constructor(@Optional() private _config: DateTimePickerConfig) {

        // when the active date changes set the currently selected date
        this._subscription = this.selected$.pipe(distinctUntilChanged(dateComparator)).subscribe(date => {

            // the month and year displayed in the viewport should reflect the newly selected items
            this.setViewportMonth(date.getMonth());
            this.setViewportYear(date.getFullYear());

            // emit the new date to the component host
            this.date$.next(date);
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

    setDate(day: number, month: number, year: number): void {
        const date = new Date(this.selected$.value);

        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);

        this.selected$.next(date);
    }

    setDateToNow(): void {
        this.selected$.next(new Date());
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
        const offset = new Date().getTimezoneOffset();
        const zones = this._config ? this._config.timezones : timezones;
        return zones.find(timezone => timezone.offset === offset);
    }

    setTimezone(timezone: DateTimePickerTimezone): void {
        this.timezone$.next(timezone);
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