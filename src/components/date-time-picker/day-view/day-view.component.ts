import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { FocusIndicatorOriginService } from '../../../directives/accessibility/index';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { compareDays, isDateAfter, isDateBefore } from '../date-time-picker.utils';
import { DayViewItem, DayViewService } from './day-view.service';

@Component({
  selector: 'ux-date-time-picker-day-view',
  templateUrl: './day-view.component.html',
  providers: [DayViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DayViewComponent implements AfterViewInit, OnDestroy {
  readonly datePicker = inject(DateTimePickerService);

  readonly dayService = inject(DayViewService);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  private readonly _focusOrigin = inject(FocusIndicatorOriginService);

  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  private readonly _rangeService = inject(DateRangeService, { optional: true });

  private readonly _rangeOptions = inject(DateRangeOptions, { optional: true });

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

  get _rangeStart(): Date | null {
    return this._isRangeMode && this._rangeService ? this._rangeService.start : null;
  }

  get _rangeEnd(): Date | null {
    return this._isRangeMode && this._rangeService ? this._rangeService.end : null;
  }

  private readonly _onDestroy = new Subject<void>();

  constructor() {
    this.datePicker.headerEvent$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(event => (event === DatePickerHeaderEvent.Next ? this.next() : this.previous()));

    // if we are a range picker then we also want to subscribe to range changes
    if (this._rangeService) {
      merge(this._rangeService.onRangeChange, this._rangeService.onHoverChange)
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => this._changeDetector.detectChanges());

      // subscribe to changes to the start date
      this._rangeService.onStartChange
        .pipe(
          takeUntil(this._onDestroy),
          filter(date => !!date && this._isRangeEnd && this.datePicker.initialised),
          delay(0)
        )
        .subscribe(date => this.onRangeChange(date));

      // subscribe to changes to the end date
      this._rangeService.onEndChange
        .pipe(
          takeUntil(this._onDestroy),
          filter(date => !!date && this._isRangeStart && this.datePicker.initialised),
          delay(0)
        )
        .subscribe(date => this.onRangeChange(date));

      // when the range is cleared reset the selected date so we can click on the same date again if we want to
      this._rangeService.onClear
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => this.datePicker.selected$.next(null));
    }
  }

  ngAfterViewInit(): void {
    // update when there are changes to the min/max values
    merge(this.datePicker.min$, this.datePicker.max$)
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this._changeDetector.detectChanges());

    // if we open and the range start is already selected, ensure that we move the end picker to a month with options
    if (!this.datePicker.initialised && this._rangeStart && !this._rangeEnd && this._isRangeEnd) {
      this.onRangeChange(this._rangeStart);
    }

    // if we open and the range end is already selected, ensure that we move the start picker to a month with options
    if (!this.datePicker.initialised && this._rangeEnd && !this._rangeStart && this._isRangeStart) {
      this.onRangeChange(this._rangeEnd);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  /**
   * Navigate to the previous page of dates
   */
  previous(): void {
    this.datePicker.setViewportMonth(this.datePicker.month$.value - 1);
  }

  /**
   * Navigate to the next page of dates
   */
  next(): void {
    this.datePicker.setViewportMonth(this.datePicker.month$.value + 1);
  }

  /**
   * Select a particular date
   * @param date the date to select
   */
  select(date: Date): void {
    // if we are the start range picker and we click the already selected day deselect it
    if (
      this._isRangeMode &&
      this._isRangeStart &&
      this._rangeStart &&
      compareDays(this._rangeStart, date)
    ) {
      this._rangeService.setStartDate(null);
      this.datePicker.selected$.next(null);
      return;
    }

    // if we are the end range picker and we click the already selected day deselect it
    if (
      this._isRangeMode &&
      this._isRangeEnd &&
      this._rangeEnd &&
      compareDays(this._rangeEnd, date)
    ) {
      this._rangeService.setEndDate(null);
      this.datePicker.selected$.next(null);
      return;
    }

    // if we are in range mode ensure we include the time from the time picker
    if (this._isRangeMode) {
      // update the current date object
      if (this._isRangeStart && !this._rangeService.showTime) {
        this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear(), 0, 0, 0);
      } else if (this._isRangeEnd && !this._rangeService.showTime) {
        this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear(), 23, 59, 59);
      } else {
        this.datePicker.setDate(
          date.getDate(),
          date.getMonth(),
          date.getFullYear(),
          this.datePicker.hours,
          this.datePicker.minutes,
          this.datePicker.seconds
        );
      }
    } else {
      // update the current date object
      this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());
    }

    // focus the newly selected date
    this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());

    // if we select a start date that is after the end date then clear the end date
    if (this._isRangeMode && this._isRangeStart && this._rangeStart && this._rangeEnd) {
      if (this._rangeStart.getTime() > this._rangeEnd.getTime()) {
        this._rangeService.setEndDate(null);
      }
    }

    // if we select a end date that is before the start date then clear the start date
    if (this._isRangeMode && this._isRangeEnd && this._rangeStart && this._rangeEnd) {
      if (this._rangeEnd.getTime() < this._rangeStart.getTime()) {
        this._rangeService.setStartDate(null);
      }
    }
  }

  trackWeekByFn(index: number): number {
    return index;
  }

  trackDayByFn(_index: number, item: DayViewItem): string {
    return `${item.day} ${item.month} ${item.year}`;
  }

  focusDate(item: DayViewItem, dayOffset: number): void {
    // determine the date of the day
    const target = new Date(item.date.setDate(item.date.getDate() + dayOffset));

    // we should force the origin to be keyboard
    this._focusOrigin.setOrigin('keyboard');

    // identify which date should be focused
    this.dayService.setFocus(target.getDate(), target.getMonth(), target.getFullYear());
  }

  getTabbable(item: DayViewItem): boolean {
    const focused = this.dayService.focused$.value;
    const grid = this.dayService.grid$.value;
    const month = this.datePicker.month$.value;

    // if there is a focused month check if this is it
    if (focused) {
      // check if the focused day is visible
      const isFocusedDayVisible = !!grid.find(
        row =>
          !!row.find(
            _item =>
              _item.day === focused.day &&
              _item.month === focused.month &&
              _item.year === focused.year &&
              _item.month === month
          )
      );

      if (isFocusedDayVisible) {
        return (
          focused.day === item.day && focused.month === item.month && focused.year === item.year
        );
      }
    }

    // if there is no focusable day then check if there is a selected day
    const isSelectedDayVisible = !!grid.find(row => !!row.find(day => day.isActive));

    if (isSelectedDayVisible) {
      return item.isActive;
    }

    // find the first non disabled day that is part of the current month
    for (const row of grid) {
      for (const column of row) {
        if (column === item && column.month === month && !this.getDisabled(column.date)) {
          return true;
        }
      }
    }

    return false;
  }

  getDisabled(date: Date): boolean {
    // if we are not in range mode then it will always be enabled
    if (this._isRangeMode) {
      // if we are range start and dates are after the range end then they should also be disabled
      if (
        this._isRangeStart &&
        !this._rangeStart &&
        this._rangeEnd &&
        isDateAfter(date, this._rangeEnd)
      ) {
        return true;
      }

      // if we are range end and dates are before the range start then they should also be disabled
      if (
        this._isRangeEnd &&
        !this._rangeEnd &&
        this._rangeStart &&
        isDateBefore(date, this._rangeStart)
      ) {
        return true;
      }
    }

    if (this.datePicker.min$.value && isDateBefore(date, this.datePicker.min$.value)) {
      return true;
    }

    if (this.datePicker.max$.value && isDateAfter(date, this.datePicker.max$.value)) {
      return true;
    }

    return false;
  }

  isRangeStartDate(date: Date): boolean {
    return this._isRangeMode && this._rangeStart && compareDays(date, this._rangeStart);
  }

  isRangeEndDate(date: Date): boolean {
    return this._isRangeMode && this._rangeEnd && compareDays(date, this._rangeEnd);
  }

  isWithinRange(date: Date): boolean {
    return (
      this._isRangeMode &&
      this._rangeStart &&
      isDateAfter(date, this._rangeStart) &&
      isDateBefore(date, this._rangeEnd)
    );
  }

  isDateHovered(date: Date): boolean {
    // if we are not in range mode or both start and end dates are selected then dont show range hover
    if (!this._isRangeMode || !this._rangeService.hover || (this._rangeStart && this._rangeEnd)) {
      return;
    }

    return (
      (this._rangeStart &&
        isDateAfter(date, this._rangeStart) &&
        isDateBefore(date, this._rangeService.hover, true)) ||
      (this._rangeEnd &&
        isDateBefore(date, this._rangeEnd) &&
        isDateAfter(date, this._rangeService.hover, true))
    );
  }

  isItemActive(date: Date, isActive: boolean): boolean {
    if (!this._isRangeMode) {
      return isActive;
    }

    return (
      (this._isRangeStart && this._rangeStart && compareDays(this._rangeStart, date)) ||
      (this._isRangeEnd && this._rangeEnd && compareDays(this._rangeEnd, date))
    );
  }

  onRangeMouseEnter(date: Date): void {
    if (this._isRangeMode) {
      this._rangeService.setDateMouseEnter(date);
    }
  }

  onRangeMouseLeave(date: Date): void {
    if (this._isRangeMode) {
      this._rangeService.setDateMouseLeave(date);
    }
  }

  /** Announce the date when we focus on a date */
  announceRangeMode(): void {
    if (this._isRangeMode) {
      this._liveAnnouncer.announce(
        this._isRangeStart
          ? this._rangeService.startPickerAriaLabel
          : this._rangeService.endPickerAriaLabel
      );
    }
  }

  /** Determine if we should focus a date */
  shouldFocus(item: DayViewItem): boolean {
    // if we are opening the popover initially we never want to focus a date in the range end picker
    if (
      (!this.datePicker.initialised && this._isRangeEnd) ||
      (this._rangeService && this._rangeService.isChangingTime)
    ) {
      return false;
    }

    // extract the current focused dates
    const { day, month, year } = this.dayService.focused$.value;

    // check if the current date is the focused date and it is in the viewport date
    return day === item.day && month === item.month && year === item.year && item.isCurrentMonth;
  }

  /** Update the viewport when the range changes to ensure focus is present on a valid item */
  private onRangeChange(date: Date): void {
    if (!((this._isRangeStart && !this._rangeStart) || (this._isRangeEnd && !this._rangeEnd))) {
      return;
    }

    // get the month showing on the other date range picker
    const currentDate = new Date(this.datePicker.year$.value, this.datePicker.month$.value);

    // if we are the start date and we are after the end date - ONLY then should be change the visible month the match the end date
    const startShouldUpdate =
      this._isRangeStart &&
      !this._rangeStart &&
      (currentDate.getFullYear() > date.getFullYear() ||
        (currentDate.getFullYear() === date.getFullYear() &&
          currentDate.getMonth() > date.getMonth()));

    // if we are the end date and we are before the start date - ONLY then should be change the visible month the match the start date
    const endShouldUpdate =
      this._isRangeEnd &&
      !this._rangeEnd &&
      (currentDate.getFullYear() < date.getFullYear() ||
        (currentDate.getFullYear() === date.getFullYear() &&
          currentDate.getMonth() < date.getMonth()));

    if (startShouldUpdate || endShouldUpdate) {
      this.datePicker.setViewportMonth(date.getMonth());
      this.datePicker.setViewportYear(date.getFullYear());
      this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());
      this._changeDetector.detectChanges();
    }
  }
}
