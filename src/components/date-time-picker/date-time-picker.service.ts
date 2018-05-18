import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateTimePickerConfig } from './date-time-picker.config';
import { dateComparator } from './date-time-picker.utils';

@Injectable()
export class DateTimePickerService {

    mode$: BehaviorSubject<DatePickerMode> = new BehaviorSubject<DatePickerMode>(DatePickerMode.Day);
    date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    timezone$ = new BehaviorSubject<DateTimePickerTimezone>(this.getCurrentTimezone());
    selected$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

    // the month and year to display in the viewport
    month$: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getMonth());
    year$: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getFullYear());

    showDate$ = new BehaviorSubject<boolean>(this._config.showDate);
    showTime$ = new BehaviorSubject<boolean>(this._config.showTime);
    showTimezone$ = new BehaviorSubject<boolean>(this._config.showTimezone);
    showSeconds$ = new BehaviorSubject<boolean>(this._config.showSeconds);
    showMeridian$ = new BehaviorSubject<boolean>(this._config.showMeridian);
    showSpinners$ = new BehaviorSubject<boolean>(this._config.showSpinners);
    weekdays$ = new BehaviorSubject<string[]>(this._config.weekdays);
    nowBtnText$ = new BehaviorSubject<string>(this._config.nowBtnText);
    timezones$ = new BehaviorSubject<DateTimePickerTimezone[]>(this._config.timezones);

    header$ = new BehaviorSubject<string>(null);
    headerEvent$ = new Subject<DatePickerHeaderEvent>();

    constructor(private _config: DateTimePickerConfig) {

        // when the active date changes set the currently selected date
        this.selected$.pipe(distinctUntilChanged(dateComparator)).subscribe(date => {

            // the month and year displayed in the viewport should reflect the newly selected items
            this.setViewportMonth(date.getMonth());
            this.setViewportYear(date.getFullYear());

            // emit the new date to the component host
            this.date$.next(date);
        });
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

    goToParentMode(): void {

        switch (this.mode$.value) {

            case DatePickerMode.Day:
                return this.mode$.next(DatePickerMode.Month);

            case DatePickerMode.Month:
                return this.mode$.next(DatePickerMode.Year);
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
        return this._config.timezones.find(timezone => timezone.offset === offset);
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

export enum DatePickerHeaderEvent {
    Previous,
    Next
}

export interface DateTimePickerTimezone {
    name: string;
    offset: number;
}