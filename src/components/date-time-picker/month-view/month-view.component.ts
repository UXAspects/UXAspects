import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { MonthViewItem, MonthViewService } from './month-view.service';

@Component({
    selector: 'ux-date-time-picker-month-view',
    templateUrl: './month-view.component.html',
    providers: [MonthViewService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthViewComponent implements OnDestroy {

    private _subscription: Subscription;

    constructor(private _datePicker: DateTimePickerService, public monthService: MonthViewService) {
        this._subscription = _datePicker.headerEvent$
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /**
     * Go to the previous year
     */
    previous(): void {
        this._datePicker.setViewportYear(this._datePicker.year$.value - 1);
    }

    /**
     * Go to the next year
     */
    next(): void {
        this._datePicker.setViewportYear(this._datePicker.year$.value + 1);
    }

    /**
     * Select a month in the calendar
     * @param month the index of the month to select
     */
    select(month: number): void {
        this._datePicker.setViewportMonth(month);

        // show the day picker
        this._datePicker.goToChildMode();
    }

    focusMonth(item: MonthViewItem, monthOffset: number): void {
        let targetMonth = item.month + monthOffset;
        let targetYear = item.year;

        if (targetMonth < 0) {
            targetMonth += 12;
            targetYear -= 1;
        }

        if (targetMonth >= 12) {
            targetMonth -= 12;
            targetYear += 1;
        }

        this.monthService.setFocus(targetMonth, targetYear);
    }

    trackRowByFn(index: number): number {
        return index;
    }

    trackMonthByFn(index: number, item: MonthViewItem): string {
        return `${item.month} ${item.year}`;
    }

    getTabbable(item: MonthViewItem): boolean {
        const focused = this.monthService.focused$.value;
        const grid = this.monthService.grid$.value;

        // if there is a focused month check if this is it
        if (focused) {

            // check if the focused month is visible
            const isFocusedMonthVisible = !!grid.find(row => !!row.find(_item => _item.month === focused.month && _item.year === focused.year));

            if (isFocusedMonthVisible) {
                return focused.month === item.month && focused.year === item.year;
            }
        }

        // if there is no focusable month then check if there is a selected month
        const isSelectedMonthVisible = !!grid.find(row => !!row.find(month => month.isActiveMonth));

        if (isSelectedMonthVisible) {
            return item.isActiveMonth;
        }

        // otherwise make the first month tabbable
        return item.month === 0;
    }
}