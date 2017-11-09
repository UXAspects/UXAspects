import { EventEmitter } from '@angular/core';
export declare class DateTimePickerMonthViewComponent {
    date: Date;
    year: number;
    month: number;
    monthChange: EventEmitter<number>;
    yearChange: EventEmitter<number>;
    ascend: EventEmitter<void>;
    months: number[][];
    currentDate: Date;
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
}
