import { EventEmitter, OnInit } from '@angular/core';
export declare class DateTimePickerYearViewComponent implements OnInit {
    private _page;
    header: string;
    years: number[][];
    currentYear: number;
    year: number;
    yearChange: EventEmitter<number>;
    ngOnInit(): void;
    select(year: number): void;
    previous(): void;
    next(): void;
    update(): void;
    /**
     * Get the years in the current decade to display
     */
    getDecade(): DatePickerYearRange;
}
export interface DatePickerYearRange {
    start: number;
    end: number;
    range: number[];
}
