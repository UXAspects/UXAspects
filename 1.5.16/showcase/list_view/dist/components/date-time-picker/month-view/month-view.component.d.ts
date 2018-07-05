import { OnDestroy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
import { MonthViewItem, MonthViewService } from './month-view.service';
export declare class MonthViewComponent implements OnDestroy {
    private _datePicker;
    monthService: MonthViewService;
    private _subscription;
    constructor(_datePicker: DateTimePickerService, monthService: MonthViewService);
    ngOnDestroy(): void;
    /**
     * Go to the previous year
     */
    previous(): void;
    /**
     * Go to the next year
     */
    next(): void;
    /**
     * Select a month in the calendar
     * @param month the index of the month to select
     */
    select(month: number): void;
    focusMonth(item: MonthViewItem, monthOffset: number): void;
    trackRowByFn(index: number): number;
    trackMonthByFn(index: number, item: MonthViewItem): string;
    getTabbable(item: MonthViewItem): boolean;
}
