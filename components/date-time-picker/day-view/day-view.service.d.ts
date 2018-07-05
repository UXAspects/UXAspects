import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService } from '../date-time-picker.service';
export declare class DayViewService implements OnDestroy {
    private _datepicker;
    grid$: BehaviorSubject<DayViewItem[][]>;
    focused$: BehaviorSubject<FocusedDayItem>;
    private _subscription;
    constructor(_datepicker: DateTimePickerService);
    ngOnDestroy(): void;
    setFocus(day: number, month: number, year: number): void;
    private createDayGrid(month, year);
    /**
   * Determine whether or not a specific date is today
   * @param date The date to check
   */
    private isToday(date);
    /**
     * Determines whether or not a specific date is the selected one
     * @param date the date to check
     */
    private isActive(date);
}
export interface DayViewItem {
    day: number;
    month: number;
    year: number;
    date: Date;
    isToday: boolean;
    isActive: boolean;
    isCurrentMonth: boolean;
}
export interface FocusedDayItem {
    day: number;
    month: number;
    year: number;
}
