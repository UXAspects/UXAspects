import { Subject } from 'rxjs';
import { compareDays, isDateAfter, isDateBefore } from '../date-time-picker/date-time-picker.utils';

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

    /** Emit whenever the start date changes */
    onStartChange = new Subject<Date>();

    /** Emit whenever the end date changes */
    onEndChange = new Subject<Date>();

    /** Emit whenever the range has changed */
    onRangeChange = new Subject<void>();

    /** Emit whenever the hover date changes */
    onHoverChange = new Subject<void>();

    /** Emit whenever the range is cleared */
    onClear = new Subject<void>();

    /** Indicate if we should show time */
    showTime: boolean = false;

    /** Defines the aria label for the range start picker */
    startPickerAriaLabel: string = 'Selecting the start date';

    /** Defines the aria label for the range end picker */
    endPickerAriaLabel: string = 'Selecting the end date';

    /** Indicate if we are currently changing the time */
    isChangingTime: boolean = false;

    /** Store the current start time */
    startTime: DateRangeTime = { hours: 0, minutes: 0, seconds: 0 };

    /** Store the current end time */
    endTime: DateRangeTime = { hours: 23, minutes: 59, seconds: 59 };

    setStartDate(date: Date | null): void {

        // if the start date is after the end date the clear the end date
        if (date && this.end && isDateAfter(date, this.end)) {
            this.clear();
        }

        this.start = date;
        this.onStartChange.next(this.start);
        this.onRangeChange.next();
    }

    setEndDate(date: Date | null): void {

        // if the end date is before the start date the clear the start date
        if (date && this.start && isDateBefore(date, this.start)) {
            this.clear();
        }

        this.end = date;
        this.onEndChange.next(this.end);
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

export interface DateRangeTime {
    hours: number;
    minutes: number;
    seconds: number;
}