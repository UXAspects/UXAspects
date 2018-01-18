import { OnInit } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
export declare class DateTimePickerYearViewComponent implements OnInit {
    private _dateTimePickerService;
    private _page;
    header: string;
    years: number[][];
    currentYear: number;
    ngOnInit(): void;
    year: number;
    constructor(_dateTimePickerService: DateTimePickerService);
    select(year: number): void;
    previous(): void;
    next(): void;
    update(): void;
    /**
     * Get the years in the current decade to display
     */
    getDecade(): DatePickerYearRange;
    /**
     * Show the month picker view
     */
    showMonthPicker(): void;
}
export interface DatePickerYearRange {
    start: number;
    end: number;
    range: number[];
}
