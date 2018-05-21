import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DatePickerMode, DateTimePickerService } from '../date-time-picker.service';
import { MonthViewService, MonthViewItem } from './month-view.service';

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
}