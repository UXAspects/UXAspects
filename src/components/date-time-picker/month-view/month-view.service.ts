import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { DateTimePickerService } from '../date-time-picker.service';
import { gridify, monthsShort, range } from '../date-time-picker.utils';

@Injectable()
export class MonthViewService implements OnDestroy {

    grid$ = new BehaviorSubject<MonthViewItem[][]>([[]]);

    private _subscription: Subscription;

    constructor(private _datePicker: DateTimePickerService) {
        this._subscription = _datePicker.year$.subscribe(year => this.createMonthGrid(year));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private createMonthGrid(year: number): void {

        // update the header
        this._datePicker.setHeader(year.toString());

        // create a 4x3 grid of month numbers
        const months: number[][] = gridify(range(0, 11), 4);

        // get the current year and month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // get the currently selected month
        const activeMonth = this._datePicker.selected$.value.getMonth();
        const activeYear = this._datePicker.selected$.value.getFullYear();

        // map these to the appropriate format
        const items: MonthViewItem[][] = months.map(row => row.map(month => {
            return {
                name: monthsShort[month],
                month: month,
                year: year,
                isCurrentMonth: year === currentYear && month === currentMonth,
                isActiveMonth: year === activeYear && month === activeMonth
            };
        }));

        // update the grid
        this.grid$.next(items);
    }
}

export interface MonthViewItem {
    name: string;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    isActiveMonth: boolean;
}