import { Component, Input, Output, EventEmitter } from '@angular/core';
import { dateRange, gridify, compareDays, months, weekdaysShort } from '../date-time-picker.utils';

@Component({
  selector: 'ux-date-time-picker-day-view',
  templateUrl: './day-view.component.html'
})
export class DateTimePickerDayViewComponent {

  header: string;
  days: DatePickerDay[][] = [];

  private _date: Date;

  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();
  @Input() weekdays: string[] = weekdaysShort;
  @Output() ascend: EventEmitter<void> = new EventEmitter<void>();
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() monthChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set date(value: Date) {
    this._date = value;
    
    // update the month and year
    this.month = this._date.getMonth();
    this.year = this._date.getFullYear();

    // emit the changes
    this.monthChange.emit(this.month);
    this.yearChange.emit(this.year);

    this.update();
  }

  get date(): Date {
    return this._date;
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

    // emit the changes
    this.monthChange.emit(this.month);
    this.yearChange.emit(this.year);

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

    // emit the changes
    this.monthChange.emit(this.month);
    this.yearChange.emit(this.year);

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
    this._date = new Date(date);

    // emit the new date
    this.dateChange.emit(this._date);
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
}

export interface DatePickerDay {
  date: Date;
  today: boolean;
  active: boolean;
  currentMonth: boolean;
}