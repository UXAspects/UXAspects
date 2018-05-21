import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { compareDays, dateRange, gridify, months } from '../date-time-picker.utils';

@Injectable()
export class DayViewService implements OnDestroy {

    grid$ = new BehaviorSubject<DayViewItem[][]>([[]]);
    focused$ = new BehaviorSubject<FocusedDayItem>(null);

    private _subscription: Subscription;

    constructor(private _datepicker: DateTimePickerService) {
        this._subscription = combineLatest(_datepicker.month$, _datepicker.year$)
            .subscribe(([month, year]) => this.createDayGrid(month, year));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    setFocus(day: number, month: number, year: number): void {
        this.focused$.next({ day: day, month: month, year: year });

        // update the date picker to show the required month and year
        this._datepicker.setViewportMonth(month);
        this._datepicker.setViewportYear(year);
    }

    private createDayGrid(month: number, year: number): void {

        // update the header
        this._datepicker.setHeader(months[month] + ' ' + year);

        // find the lower and upper boundaries
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);

        // we always want to show from the sunday - this may include showing some dates from the previous month
        start.setDate(start.getDate() - start.getDay());

        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));

        // create an array of all the days to display
        const dates = dateRange(start, end);

        // turn the dates into a grid
        const items: DayViewItem[][] = gridify(dates, 7).map(week => week.map(date => ({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date,
            isToday: this.isToday(date),
            isActive: this.isActive(date),
            isCurrentMonth: date.getMonth() === month
        })));

        this.grid$.next(items);

        // if no item has yet been focused then focus the first day of the month
        if ((this._datepicker.modeDirection === ModeDirection.None || this._datepicker.modeDirection === ModeDirection.Descend) && this.focused$.value === null) {

            // find the first day of the month
            const first = items[0].find(date => date.day === 1);

            // focus the date
            this.setFocus(first.day, first.month, first.year);
        }
    }

    /**
   * Determine whether or not a specific date is today
   * @param date The date to check
   */
    private isToday(date: Date): boolean {
        return compareDays(new Date(), date);
    }

    /**
     * Determines whether or not a specific date is the selected one
     * @param date the date to check
     */
    private isActive(date: Date): boolean {
        return compareDays(this._datepicker.selected$.value, date);
    }
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