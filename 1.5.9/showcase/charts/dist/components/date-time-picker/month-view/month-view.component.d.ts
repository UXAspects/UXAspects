import { DateTimePickerService } from '../date-time-picker.service';
export declare class DateTimePickerMonthViewComponent {
    private _dateTimePickerService;
    months: number[][];
    currentDate: Date;
    readonly date: Date;
    month: number;
    year: number;
    constructor(_dateTimePickerService: DateTimePickerService);
    /**
     * Go to the previous year and emit the change
     */
    previous(): void;
    /**
     * Go to the next year and emit the change
     */
    next(): void;
    /**
     * Select a month in the calendar
     * @param month the index of the month to select
     */
    select(month: number): void;
    /**
     * Get the name of a month
     * @param month the month in question
     */
    getMonthName(month: number): string;
    /**
     * Show the daye picker view
     */
    showDayPicker(): void;
    /**
     * Show the year picker view
     */
    showYearPicker(): void;
}
