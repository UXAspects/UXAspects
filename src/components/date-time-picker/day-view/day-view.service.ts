import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DateTimePickerService } from '../date-time-picker.service';
import { compareDays, dateRange, gridify, months } from '../date-time-picker.utils';

@Injectable()
export class DayViewService implements OnDestroy {

    grid$ = new BehaviorSubject<DayViewItem[][]>([[]]);

    private _subscription: Subscription;

    constructor(private _datePicker: DateTimePickerService) {
        this._subscription = combineLatest(_datePicker.month$, _datePicker.year$)
            .subscribe(([month, year]) => this.createDayGrid(month, year));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private createDayGrid(month: number, year: number): void {

        // update the header
        this._datePicker.setHeader(months[month] + ' ' + year);

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
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date,
            isToday: this.isToday(date),
            isActive: this.isActive(date),
            isCurrentMonth: date.getMonth() === month
        })));

        this.grid$.next(items);
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
        return compareDays(this._datePicker.selected$.value, date);
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