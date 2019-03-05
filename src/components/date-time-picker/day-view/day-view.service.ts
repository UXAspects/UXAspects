import { WeekDay } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { compareDays, dateRange, gridify } from '../date-time-picker.utils';

@Injectable()
export class DayViewService implements OnDestroy {

    grid$ = new BehaviorSubject<DayViewItem[][]>([[]]);
    focused$ = new BehaviorSubject<FocusedDayItem>(null);

    private _subscription: Subscription;

    constructor(private _datepicker: DateTimePickerService) {
        this._subscription = combineLatest(_datepicker.month$, _datepicker.year$, _datepicker.startOfWeek$)
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
        this._datepicker.setHeader(this._datepicker.months[month] + ' ' + year);

        // find the lower and upper boundaries
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);

        // ensure the startOfWeek value is between 0-6 to prevent any infinite loop
        const startOfWeek = Math.min(WeekDay.Saturday, Math.max(WeekDay.Sunday, this._datepicker.startOfWeek$.value));

        // we always want to show from the specified start of week - this may include showing some dates from the previous month
        while (start.getDay() !== startOfWeek) {
            start.setDate(start.getDate() - 1);
        }

        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));

        // create an array of all the days to display
        const dates: DayViewItem[] = dateRange(start, end).map(date => ({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date,
            isToday: this.isToday(date),
            isActive: this.isActive(date),
            isCurrentMonth: date.getMonth() === month
        }));

        // turn the dates into a grid
        const items: DayViewItem[][] = gridify(dates, 7);

        this.grid$.next(items);

        // if no item has yet been focused then focus the first day of the month
        if ((this._datepicker.modeDirection === ModeDirection.None || this._datepicker.modeDirection === ModeDirection.Descend) && this.focused$.value === null) {

            // check if the selected item is visible
            const selectedDay = dates.find(day => day.isCurrentMonth && day.isActive);

            if (selectedDay) {
                this.setFocus(selectedDay.day, selectedDay.month, selectedDay.year);
            } else {

                // find the first day of the month
                const first = dates.find(date => date.day === 1);

                // focus the date
                this.setFocus(first.day, first.month, first.year);
            }

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
        return this._datepicker.selected$.value ? compareDays(this._datepicker.selected$.value, date) : false;
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