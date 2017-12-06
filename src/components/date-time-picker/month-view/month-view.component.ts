import { Component, Input, Output, EventEmitter } from '@angular/core';
import { gridify, range, monthsShort } from '../date-time-picker.utils';
import { DateTimePickerService } from '../date-time-picker.service';
import { DatePickerMode } from '../date-time-picker.component';

@Component({
  selector: 'ux-date-time-picker-month-view',
  templateUrl: './month-view.component.html'
})
export class DateTimePickerMonthViewComponent {

  months: number[][] = gridify(range(0, 11), 4);
  currentDate: Date = new Date();

  get date() {
    return this._dateTimePickerService.activeDate.getValue();
  }

  set month(value: number) {
    this._dateTimePickerService.month.next(value);
  }

  get month(): number {
    return this._dateTimePickerService.month.getValue();
  }

  set year(value: number) {
    this._dateTimePickerService.year.next(value);
  }

  get year(): number {
    return this._dateTimePickerService.year.getValue();
  }

  constructor(private _dateTimePickerService: DateTimePickerService) {}

  /**
   * Go to the previous year and emit the change
   */
  previous(): void {
    this.year--;
  }

  /**
   * Go to the next year and emit the change
   */
  next(): void {
    this.year++;
  }

  /**
   * Select a month in the calendar
   * @param month the index of the month to select
   */
  select(month: number): void {
    this.month = month;

    // show the day picker
    this.showDayPicker();
  }

  /**
   * Get the name of a month
   * @param month the month in question
   */
  getMonthName(month: number): string {
    return monthsShort[month];
  }

  /**
   * Show the daye picker view
   */
  showDayPicker(): void {
    this._dateTimePickerService.mode.next(DatePickerMode.Day);
  }

  /**
   * Show the year picker view
   */
  showYearPicker(): void {
    this._dateTimePickerService.mode.next(DatePickerMode.Year);
  }
}