import { Subject } from 'rxjs/Subject';
import { compareDays } from '../date-time-picker/date-time-picker.utils';

export class DateRangeService {

  /** Indicate whether we want to show a date range */
  isRange: boolean = false;

  /** Specify the direction of the selection */
  direction: DateRangePicker = DateRangePicker.Start;

  /** Specify the start of the range */
  start: Date;

  /** Specify the end of the range */
  end: Date;

  /** Specify the date we are hovering over */
  hover: Date;

  /** Emit whenever the range has changed */
  onRangeChange = new Subject<void>();

  /** Emit whenever the hover date changes */
  onHoverChange = new Subject<void>();

  /** Emit whenever the range is cleared */
  onClear = new Subject<void>();

  setStartDate(date: Date | null): void {
    this.start = date;
    this.onRangeChange.next();
  }

  setEndDate(date: Date | null): void {
    this.end = date;
    this.onRangeChange.next();
  }

  clear(): void {
    this.setStartDate(null);
    this.setEndDate(null);
    this.onClear.next();
  }

  setDateMouseEnter(date: Date | null): void {
    this.hover = date;
    this.onHoverChange.next();
  }

  setDateMouseLeave(date: Date): void {
    if (date && this.hover && compareDays(date, this.hover)) {
      this.setDateMouseEnter(null);
    }
  }

}

export enum DateRangePicker {
  Start = 'start',
  End = 'end'
}
