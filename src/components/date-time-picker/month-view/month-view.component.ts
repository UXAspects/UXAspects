import { Component, Input, Output, EventEmitter } from '@angular/core';
import { gridify, range, monthsShort } from '../date-time-picker.utils';

@Component({
  selector: 'ux-date-time-picker-month-view',
  templateUrl: './month-view.component.html'
})
export class DateTimePickerMonthViewComponent {


  @Input() date: Date = new Date();
  @Input() year: number = new Date().getFullYear();
  @Input() month: number = new Date().getMonth();

  @Output() monthChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() yearChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() ascend: EventEmitter<void> = new EventEmitter<void>();

  months: number[][] = gridify(range(0, 11), 4);
  currentDate: Date = new Date();

  /**
   * Go to the previous year and emit the change
   */
  previous(): void {
    this.yearChange.emit(--this.year);
  }

  /**
   * Go to the next year and emit the change
   */
  next(): void {
    this.yearChange.emit(++this.year);
  }

  /**
   * Select a month in the calendar
   * @param month the index of the month to select
   */
  select(month: number): void {

    // store the new month
    this.month = month;

    // emit the changes
    this.monthChange.emit(this.month);
    this.yearChange.emit(this.year);
  }

  /**
   * Get the name of a month
   * @param month the month in question
   */
  getMonthName(month: number): string {
    return monthsShort[month];
  }
}