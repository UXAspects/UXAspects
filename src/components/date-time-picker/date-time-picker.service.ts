import { WeekDay } from '@angular/common';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { DateRangeOptions } from '../date-range-picker/date-range-picker.directive';
import { DateRangeService } from '../date-range-picker/date-range.service';
import { DateTimePickerConfig } from './date-time-picker.config';
import {
  dateComparator,
  DateTimePickerTimezone,
  meridians,
  months,
  monthsShort,
  timezones,
  weekdaysShort,
} from './date-time-picker.utils';

@Injectable()
export class DateTimePickerService implements OnDestroy {
  private readonly _config = inject(DateTimePickerConfig, { optional: true });

  readonly rangeService = inject(DateRangeService, { optional: true });

  readonly rangeOptions = inject(DateRangeOptions, { optional: true });

  mode$: BehaviorSubject<DatePickerMode> = new BehaviorSubject<DatePickerMode>(DatePickerMode.Day);
  date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  timezone$ = new BehaviorSubject<DateTimePickerTimezone>(null);
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
  timezones$ = new BehaviorSubject<DateTimePickerTimezone[]>(
    this._config ? this._config.timezones : timezones
  );
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

  private readonly _subscription: Subscription;

  constructor() {
    // when the active date changes set the currently selected date
    this._subscription = this.selected$.subscribe(date => {
      // the month and year displayed in the viewport should reflect the newly selected items
      if (date instanceof Date) {
        this.setViewportMonth(date.getMonth());
        this.setViewportYear(date.getFullYear());
      }

      // emit the new date to the component host but only if they are different
      if (!dateComparator(date, this.date$.value)) {
        if (this.rangeService) {
          if (this.rangeOptions.picker === 'start') {
            this.rangeService.setStartDate(date);
          } else {
            this.rangeService.setEndDate(date);
          }
        } else {
          this.date$.next(date);
        }
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

  setDate(
    day: number,
    month: number,
    year: number,
    hours?: number,
    minutes?: number,
    seconds?: number
  ): void {
    const date = new Date(this.selected$.value);

    date.setFullYear(year);
    date.setMonth(month, day);

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

  isTimezoneAvailable(timezone: DateTimePickerTimezone): boolean {
    if (!timezone || !this.timezones$.value) {
      return false;
    }

    return (
      this.timezones$.value.findIndex(
        _timezone => _timezone.offset === timezone.offset && _timezone.name === timezone.name
      ) !== -1
    );
  }

  getDefaultTimezone(): DateTimePickerTimezone {
    const offset = new Date().getTimezoneOffset();
    const matchingZone = this.timezones$.value.find(_timezone => _timezone.offset === offset);

    return (
      matchingZone ||
      this.timezones$.value.find(_timezone => _timezone.offset === 0) || { name: 'GMT', offset: 0 }
    );
  }

  isInRange(date: Date): boolean {
    return (
      (!this.min$.value || date >= this.min$.value) && (!this.max$.value || date <= this.max$.value)
    );
  }
}

export enum DatePickerMode {
  Day,
  Month,
  Year,
}

export enum ModeDirection {
  None,
  Ascend,
  Descend,
}

export enum DatePickerHeaderEvent {
  Previous,
  Next,
}

export interface YearRange {
  start: number;
  end: number;
  range: number[];
}
