import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';

@Injectable()
export class MonthViewService implements OnDestroy {

    grid$ = new BehaviorSubject<MonthViewItem[][]>([[]]);
    focused$ = new BehaviorSubject<FocusedMonthItem>(null);

    private _subscription: Subscription;

    constructor(private _datepicker: DateTimePickerService) {
        this._subscription = _datepicker.year$.subscribe(year => this.createMonthGrid(year));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    setFocus(month: number, year: number): void {
        this.focused$.next({ month: month, year: year });

        // update the viewport to ensure focused month is visible
        this._datepicker.setViewportYear(year);
    }

    private createMonthGrid(year: number): void {

        // update the header
        this._datepicker.setHeader(year.toString());

        // get the current year and month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // get the currently selected month
        const activeMonth = this._datepicker.selected$.value ? this._datepicker.selected$.value.getMonth() : null;
        const activeYear = this._datepicker.selected$.value ? this._datepicker.selected$.value.getFullYear() : null;

        // create a 4x3 grid of month numbers
        const months: MonthViewItem[] = range(0, 11).map(month => {
            return {
                name: this._datepicker.monthsShort[month],
                month: month,
                year: year,
                isCurrentMonth: year === currentYear && month === currentMonth,
                isActiveMonth: year === activeYear && month === activeMonth
            };
        });

        // map these to the appropriate format
        const items: MonthViewItem[][] = gridify(months, 4);

        // update the grid
        this.grid$.next(items);

        // if there is no focused month select the first one
        if (this._datepicker.modeDirection === ModeDirection.Descend && this.focused$.value === null) {

            // check if the selected month is in view
            const selectedMonth = months.find(month => month.isActiveMonth);

            this.setFocus(selectedMonth ? selectedMonth.month : 0, year);
        }
    }
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