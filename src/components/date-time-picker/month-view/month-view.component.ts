import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Optional } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { isDateAfter, isDateBefore } from '../date-time-picker.utils';
import { FocusedMonthItem, MonthViewItem, MonthViewService } from './month-view.service';

@Component({
    selector: 'ux-date-time-picker-month-view',
    templateUrl: './month-view.component.html',
    providers: [MonthViewService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthViewComponent implements OnDestroy {

    /** Determine if we are in range selection mode */
    get _isRangeMode(): boolean {
        return !!this._rangeOptions;
    }

    /** Determine if this picker is the start picker */
    get _isRangeStart(): boolean {
        return this._isRangeMode && this._rangeOptions.picker === DateRangePicker.Start;
    }

    /** Determine if this picker is the end picker */
    get _isRangeEnd(): boolean {
        return this._isRangeMode && this._rangeOptions.picker === DateRangePicker.End;
    }

    get _rangeStart(): Date | null {
        return this._isRangeMode && this._rangeService ? this._rangeService.start : null;
    }

    get _rangeEnd(): Date | null {
        return this._isRangeMode && this._rangeService ? this._rangeService.end : null;
    }

    get _minMonth(): Date | null {
        return this._datePicker.min$.value ? new Date(this._datePicker.min$.value.getFullYear(), this._datePicker.min$.value.getMonth()) : null;
    }

    get _maxMonth(): Date | null {
        return this._datePicker.max$.value ? new Date(this._datePicker.max$.value.getFullYear(), this._datePicker.max$.value.getMonth()) : null;
    }

    private _onDestroy = new Subject<void>();

    constructor(
        private _datePicker: DateTimePickerService,
        public monthService: MonthViewService,
        private _liveAnnouncer: LiveAnnouncer,
        changeDetector: ChangeDetectorRef,
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions) {

        _datePicker.headerEvent$.pipe(takeUntil(this._onDestroy))
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());

        if (this._rangeService) {
            this._rangeService.onRangeChange.pipe(takeUntil(this._onDestroy)).subscribe(() => changeDetector.detectChanges());
        }

        // if the currently focused item is disabled then choose a month that isn't disabled
        if (this.monthService.focused$.value) {
            if (this.getDisabled(this.monthService.focused$.value)) {
                for (const row of this.monthService.grid$.value) {
                    for (const column of row) {
                        if (!this.getDisabled(column)) {
                            this.monthService.setFocus(column.month, column.year);
                            return;
                        }
                    }
                }
            }
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Get the disabled state of a month */
    getDisabled(item: MonthViewItem | FocusedMonthItem): boolean {

        const date = new Date(item.year, item.month);

        // if we are not in range mode then it will always be enabled
        if (this._isRangeMode) {

            // if we are range start and dates are after the range end then they should also be disabled
            if (this._isRangeStart && this._rangeEnd && isDateAfter(date, new Date(this._rangeEnd.getFullYear(), this._rangeEnd.getMonth()))) {
                return true;
            }

            // if we are range end and dates are before the range start then they should also be disabled
            if (this._isRangeEnd && this._rangeStart && isDateBefore(date, new Date(this._rangeStart.getFullYear(), this._rangeStart.getMonth()))) {
                return true;
            }
        }

        if (this._minMonth && isDateBefore(date, this._minMonth)) {
            return true;
        }

        if (this._maxMonth && isDateAfter(date, this._maxMonth)) {
            return true;
        }

        return false;
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

    trackMonthByFn(_index: number, item: MonthViewItem): string {
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

        // otherwise find the first non-disabled month
        for (const row of grid) {
            for (const column of row) {
                if (!this.getDisabled(column)) {
                    return item === column;
                }
            }
        }

        return false;
    }

    /** Announce the date when we focus on a date */
    announceRangeMode(): void {
        if (this._isRangeMode) {
            this._liveAnnouncer.announce(this._isRangeStart ? this._rangeService.startPickerAriaLabel : this._rangeService.endPickerAriaLabel);
        }
    }

    shouldFocus(item: MonthViewItem): boolean {
        const focused = this.monthService.focused$.value;

        if (focused) {
            return focused.month === item.month && focused.year === item.year;
        }
    }
}