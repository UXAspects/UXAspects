import { Component, OnInit } from '@angular/core';
import { DatePickerMode } from '../date-time-picker.component';
import { DateTimePickerService } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';

@Component({
  selector: 'ux-date-time-picker-year-view',
  templateUrl: './year-view.component.html'
})
export class DateTimePickerYearViewComponent implements OnInit {

  private _page: number = 0;

  header: string;
  years: number[][] = [];
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.update();
  }

  set year(value: number) {
    this._dateTimePickerService.year.next(value);
  }

  get year(): number {
    return this._dateTimePickerService.year.getValue();
  }

  constructor(private _dateTimePickerService: DateTimePickerService) {}

  select(year: number): void {
    this.year = year;

    // show the month picker
    this.showMonthPicker();
  }

  previous(): void {
    this._page--;
    this.update();
  }

  next(): void {
    this._page++;
    this.update();
  }

  update(): void {

    // get the years to display
    const decade = this.getDecade();

    // update the header
    this.header = `${decade.start} - ${decade.end}`;

    // create the grid
    this.years = gridify(decade.range, 4);
  }

  /**
   * Get the years in the current decade to display
   */
  getDecade(): DatePickerYearRange {

    // the number of years to display
    const yearCount = 10;

    // figure the start and end points
    const start = (this.year - (this.year % yearCount)) + (this._page * yearCount);
    const end = start + yearCount - 1;

    // create an array containing all the numbers between the start and end points
    return { start: start, end: end, range: range(start, end) };
  }

  /**
   * Show the month picker view
   */
  showMonthPicker(): void {
    this._dateTimePickerService.mode.next(DatePickerMode.Month);
  }

}

export interface DatePickerYearRange {
  start: number;
  end: number;
  range: number[];
}