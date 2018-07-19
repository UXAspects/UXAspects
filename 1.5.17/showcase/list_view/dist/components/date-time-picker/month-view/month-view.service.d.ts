import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService } from '../date-time-picker.service';
export declare class MonthViewService implements OnDestroy {
    private _datepicker;
    grid$: BehaviorSubject<MonthViewItem[][]>;
    focused$: BehaviorSubject<FocusedMonthItem>;
    private _subscription;
    constructor(_datepicker: DateTimePickerService);
    ngOnDestroy(): void;
    setFocus(month: number, year: number): void;
    private createMonthGrid(year);
}
export interface MonthViewItem {
    name: string;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    isActiveMonth: boolean;
}
export interface FocusedMonthItem {
    month: number;
    year: number;
}
