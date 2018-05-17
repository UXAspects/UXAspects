import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/distinctUntilChanged';
import { DateTimePickerService, DatePickerMode } from '../date-time-picker.service';
import { compareDays, dateRange, gridify, months, weekdaysShort } from '../date-time-picker.utils';

@Component({
  selector: 'ux-date-time-picker-day-view',
  templateUrl: './day-view.component.html'
})
export class DateTimePickerDayViewComponent implements OnInit, OnDestroy {

  header: string;
  days: DatePickerDay[][] = [];

  @Input() weekdays: string[] = weekdaysShort;
  @Output() dateChange: EventEmitter<void> = new EventEmitter<void>();

  set date(value: Date) {
    this.dateTimePickerService.activeDate.next(value);
  }

  get date() {
    return this.dateTimePickerService.activeDate.getValue();
  }

  set month(value: number) {
    this.dateTimePickerService.month.next(value);
  }

  get month(): number {
    return this.dateTimePickerService.month.getValue();
  }

  set year(value: number) {
    this.dateTimePickerService.year.next(value);
  }

  get year(): number {
    return this.dateTimePickerService.year.getValue();
  }

  private _subscription: Subscription;

  constructor(public dateTimePickerService: DateTimePickerService) {}

  ngOnInit(): void {

    // update the grid only when the value of the active date, month or year has changed
    this._subscription = Observable.merge(
      this.dateTimePickerService.activeDate.distinctUntilChanged(),
      this.dateTimePickerService.month.distinctUntilChanged(),
      this.dateTimePickerService.year.distinctUntilChanged()
    )
    .subscribe(() => this.update());

  }

  ngOnDestroy(): void {
    // remove all subscriptions
    this._subscription.unsubscribe();
  }

  /**
   * Navigate to the previous page of dates
   */
  previous(): void {

    // update the month
    this.month--;

    // if the month is now the previous year take that into account
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }

    // update the grid
    this.update();
  }

  /**
   * Navigate to the next page of dates
   */
  next(): void {

    // update the month
    this.month++;

    // if the month is now the previous year take that into account
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }

    // update the grid
    this.update();
  }

  /**
   * Updates the grid of all the days in the month
   */
  update(): void {

    // find the lower and upper boundaries
    const start = new Date(this.year, this.month, 1);
    const end = new Date(this.year, this.month + 1, 0);

    // we always want to show from the sunday - this may include showing some dates from the previous month
    start.setDate(start.getDate() - start.getDay());

    // we also want to make sure that the range ends on a saturday
    end.setDate(end.getDate() + (6 - end.getDay()));

    // create an array of all the days to display
    const dates = dateRange(start, end);

    // update the page header
    this.header = `${months[this.month]} ${this.year}`;

    // turn the dates into a grid
    this.days = gridify(dates, 7).map(week => week.map(date => ({
      date: date,
      today: this.isToday(date),
      active: this.isActive(date),
      currentMonth: this.isCurrentMonth(date)
    })));
  }

  /**
   * Select a particular date
   * @param date the date to select
   */
  select(date: Date): void {
    // update the current date object
    this.date = new Date(date);

    // emit the new date
    this.dateChange.emit();
  }

  /**
   * Determine whether or not a specific date is today
   * @param date The date to check
   */
  isToday(date: Date): boolean {
    return compareDays(new Date(), date);
  }

  /**
   * Determines whether or not a specific date is the selected one
   * @param date the date to check
   */
  isActive(date: Date): boolean {
    return compareDays(this.date, date);
  }

  /**
   * Determine whether or not a date is within the current month
   * or is it part of another month being show to fill the grid
   * @param date The date in question
   */
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.month;
  }

  /**
   * Update the date picker view to show the month picker
   */
  showMonthPicker(): void {
    this.dateTimePickerService.mode.next(DatePickerMode.Month);
  }
}

export interface DatePickerDay {
  date: Date;
  today: boolean;
  active: boolean;
  currentMonth: boolean;
}