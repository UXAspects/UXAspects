import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService, YearRange } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';

@Injectable()
export class YearViewService implements OnDestroy {

    grid$ = new BehaviorSubject<YearViewItem[][]>([[]]);
    focused$ = new BehaviorSubject<number>(null);

    private _year: number = new Date().getFullYear();

    private _subscription = new Subscription();

    constructor(private _datepicker: DateTimePickerService) {
        const year = _datepicker.year$.subscribe(_year => this.createYearGrid(_year));

        const event = _datepicker.headerEvent$
            .subscribe(_event => _event === DatePickerHeaderEvent.Next ? this.goToNextDecade() : this.goToPreviousDecade());

        this._subscription.add(year);
        this._subscription.add(event);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    setFocus(year: number): void {
        this.focused$.next(year);
        this.createYearGrid(year);
    }

    goToPreviousDecade(): void {
        this.createYearGrid(this._year - 10);
    }

    goToNextDecade(): void {
        this.createYearGrid(this._year + 10);
    }

    private createYearGrid(year: number = this._year): void {

        this._year = year;

        // get the years to display
        const decade = this.getDecade(year);

        const currentYear = new Date().getFullYear();

        // produce items in the correct format
        const items: YearViewItem[] = decade.range.map(_year => {
            return {
                year: _year,
                isCurrentYear: _year === currentYear,
                isActiveYear: _year === this._datepicker.year$.value
            };
        });

        // update the header text
        this._datepicker.setHeader(decade.start + ' - ' + decade.end);

        // create the grid
        this.grid$.next(gridify(items, 4));
    }

    /**
     * Get the years in the current decade to display
     */
    private getDecade(year: number): YearRange {

        // figure the start and end points
        const start = (year - (year % 10));
        const end = start + 9;

        this._datepicker.yearRange = { start: start, end: end, range: range(start, end) };

        // create an array containing all the numbers between the start and end points
        return this._datepicker.yearRange;
    }
}

export interface YearViewItem {
    year: number;
    isCurrentYear: boolean;
    isActiveYear: boolean;
}