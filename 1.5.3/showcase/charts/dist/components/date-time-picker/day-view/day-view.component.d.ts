import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/merge';
export declare class DateTimePickerDayViewComponent implements OnInit, OnDestroy {
    dateTimePickerService: DateTimePickerService;
    header: string;
    days: DatePickerDay[][];
    weekdays: string[];
    dateChange: EventEmitter<void>;
    date: Date;
    month: number;
    year: number;
    private _subscription;
    constructor(dateTimePickerService: DateTimePickerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
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
    /**
     * Update the date picker view to show the month picker
     */
    showMonthPicker(): void;
}
export interface DatePickerDay {
    date: Date;
    today: boolean;
    active: boolean;
    currentMonth: boolean;
}
