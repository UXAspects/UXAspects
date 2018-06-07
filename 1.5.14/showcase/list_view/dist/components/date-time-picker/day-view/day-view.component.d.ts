import { OnDestroy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
import { DayViewItem, DayViewService } from './day-view.service';
export declare class DayViewComponent implements OnDestroy {
    datePicker: DateTimePickerService;
    dayService: DayViewService;
    private _subscription;
    constructor(datePicker: DateTimePickerService, dayService: DayViewService);
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
     * Select a particular date
     * @param date the date to select
     */
    select(date: Date, element: HTMLElement): void;
    trackWeekByFn(index: number): number;
    trackDayByFn(index: number, item: DayViewItem): string;
    focusDate(item: DayViewItem, dayOffset: number): void;
    getTabbable(item: DayViewItem): boolean;
}
