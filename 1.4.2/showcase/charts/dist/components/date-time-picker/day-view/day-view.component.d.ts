import { EventEmitter } from '@angular/core';
export declare class DateTimePickerDayViewComponent {
    header: string;
    days: DatePickerDay[][];
    private _date;
    month: number;
    year: number;
    weekdays: string[];
    ascend: EventEmitter<void>;
    dateChange: EventEmitter<Date>;
    monthChange: EventEmitter<number>;
    yearChange: EventEmitter<number>;
    date: Date;
    /**
     * Navigate to the previous page of dates
     */
    previous(): void;
    /**
     * Navigate to the next page of dates
     */
    next(): void;
    /**
     * Updates the grid of all the days in the month
     */
    update(): void;
    /**
     * Select a particular date
     * @param date the date to select
     */
    select(date: Date): void;
    /**
     * Determine whether or not a specific date is today
     * @param date The date to check
     */
    isToday(date: Date): boolean;
    /**
     * Determines whether or not a specific date is the selected one
     * @param date the date to check
     */
    isActive(date: Date): boolean;
    /**
     * Determine whether or not a date is within the current month
     * or is it part of another month being show to fill the grid
     * @param date The date in question
     */
    isCurrentMonth(date: Date): boolean;
}
export interface DatePickerDay {
    date: Date;
    today: boolean;
    active: boolean;
    currentMonth: boolean;
}
