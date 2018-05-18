import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';

@Injectable()
export class YearViewService implements OnDestroy {

    grid$ = new BehaviorSubject<YearViewItem[][]>([[]]);

    private _page: number = 0;
    private _year: number = new Date().getFullYear();

    private _subscription = new Subscription();

    constructor(private _datePicker: DateTimePickerService) {
        const year = _datePicker.year$.subscribe(_year => this.createYearGrid(_year));

        const event = _datePicker.headerEvent$
            .subscribe(_event => _event === DatePickerHeaderEvent.Next ? this.goToNextDecade() : this.goToPreviousDecade());

        this._subscription.add(year);
        this._subscription.add(event);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    goToPreviousDecade(): void {
        this._page--;
        this.createYearGrid();
    }

    goToNextDecade(): void {
        this._page++;
        this.createYearGrid();
    }

    private createYearGrid(year: number = this._year): void {

        // store the year for future use
        this._year = year;

        // get the years to display
        const decade = this.getDecade(year);

        const currentYear = new Date().getFullYear();

        // produce items in the correct format
        const items: YearViewItem[] = decade.range.map(_year => {
            return {
                year: _year,
                isCurrentYear: _year === currentYear,
                isActiveYear: _year === year
            };
        });

        // update the header text
        this._datePicker.setHeader(decade.start + ' - ' + decade.end);

        // create the grid
        this.grid$.next(gridify(items, 4));
    }

    /**
     * Get the years in the current decade to display
     */
    private getDecade(year: number): YearRange {

        // the number of years to display
        const yearCount = 10;

        // figure the start and end points
        const start = (year - (year % yearCount)) + (this._page * yearCount);
        const end = start + yearCount - 1;

        // create an array containing all the numbers between the start and end points
        return { start: start, end: end, range: range(start, end) };
    }
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