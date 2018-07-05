import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DateTimePickerService } from '../date-time-picker.service';
export declare class YearViewService implements OnDestroy {
    private _datepicker;
    grid$: BehaviorSubject<YearViewItem[][]>;
    focused$: BehaviorSubject<number>;
    private _year;
    private _subscription;
    constructor(_datepicker: DateTimePickerService);
    ngOnDestroy(): void;
    setFocus(year: number): void;
    goToPreviousDecade(): void;
    goToNextDecade(): void;
    private createYearGrid(year?);
    /**
     * Get the years in the current decade to display
     */
    private getDecade(year);
}
export interface YearRange {
    start: number;
    end: number;
    range: number[];
}
export interface YearViewItem {
    year: number;
    isCurrentYear: boolean;
    isActiveYear: boolean;
}
