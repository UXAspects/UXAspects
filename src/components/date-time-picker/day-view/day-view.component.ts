import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Optional } from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { compareDays, isDateAfter, isDateBefore } from '../date-time-picker.utils';
import { DayViewItem, DayViewService } from './day-view.service';

@Component({
    selector: 'ux-date-time-picker-day-view',
    templateUrl: './day-view.component.html',
    providers: [DayViewService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayViewComponent implements OnDestroy {

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

    private _onDestroy = new Subject<void>();

    constructor(public datePicker: DateTimePickerService,
        public dayService: DayViewService,
        changeDetector: ChangeDetectorRef,
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions) {

        datePicker.headerEvent$.pipe(takeUntil(this._onDestroy))
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());

        // if we are a range picker then we also want to subscribe to range changes
        if (_rangeService) {
            merge(_rangeService.onRangeChange, _rangeService.onHoverChange).pipe(takeUntil(this._onDestroy))
                .subscribe(() => changeDetector.detectChanges());

            // when the range is cleared reset the selected date so we can click on the same date again if we want to
            _rangeService.onClear.pipe(takeUntil(this._onDestroy)).subscribe(() => this.datePicker.selected$.next(null));
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Navigate to the previous page of dates
     */
    previous(): void {
        this.datePicker.setViewportMonth(this.datePicker.month$.value - 1);
    }

    /**
     * Navigate to the next page of dates
     */
    next(): void {
        this.datePicker.setViewportMonth(this.datePicker.month$.value + 1);
    }

    /**
     * Select a particular date
     * @param date the date to select
     */
    select(date: Date): void {

        // if we are range picking, and have no dates selected clear the range (if we select the current day initially it won't get selected)
        if (this._isRangeMode && !this._rangeStart && !this._rangeEnd) {
            this._rangeService.clear();
        }

        // if we are the start range picker and we click the already selected day deselect it
        if (this._isRangeMode && this._isRangeStart && this._rangeStart && compareDays(this._rangeStart, date)) {
            this._rangeService.setStartDate(null);
            this.datePicker.selected$.next(null);
            return;
        }

        // if we are the end range picker and we click the already selected day deselect it
        if (this._isRangeMode && this._isRangeEnd && this._rangeEnd && compareDays(this._rangeEnd, date)) {
            this._rangeService.setEndDate(null);
            this.datePicker.selected$.next(null);
            return;
        }

        // if we are in range mode ensure we include the time from the time picker
        if (this._isRangeMode) {
            // update the current date object
            this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear(), this.datePicker.hours, this.datePicker.minutes, this.datePicker.seconds);
        } else {
            // update the current date object
            this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());
        }


        // focus the newly selected date
        this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());

        // if we select a start date that is after the end date then clear the end date
        if (this._isRangeMode && this._isRangeStart && this._rangeStart && this._rangeEnd) {
            if (this._rangeStart.getTime() > this._rangeEnd.getTime()) {
                this._rangeService.setEndDate(null);
            }
        }

        // if we select a end date that is before the start date then clear the start date
        if (this._isRangeMode && this._isRangeEnd && this._rangeStart && this._rangeEnd) {
            if (this._rangeEnd.getTime() < this._rangeStart.getTime()) {
                this._rangeService.setStartDate(null);
            }
        }
    }

    trackWeekByFn(index: number): number {
        return index;
    }

    trackDayByFn(_index: number, item: DayViewItem): string {
        return `${item.day} ${item.month} ${item.year}`;
    }

    focusDate(item: DayViewItem, dayOffset: number): void {

        // determine the date of the day
        const target = new Date(item.date.setDate(item.date.getDate() + dayOffset));

        // identify which date should be focused
        this.dayService.setFocus(target.getDate(), target.getMonth(), target.getFullYear());
    }

    getTabbable(item: DayViewItem): boolean {
        const focused = this.dayService.focused$.value;
        const grid = this.dayService.grid$.value;

        // if there is a focused month check if this is it
        if (focused) {

            // check if the focused day is visible
            const isFocusedDayVisible = !!grid.find(row => !!row.find(_item => _item.day === focused.day && _item.month === focused.month && _item.year === focused.year));

            if (isFocusedDayVisible) {
                return focused.day === item.day && focused.month === item.month && focused.year === item.year;
            }
        }

        // if there is no focusable day then check if there is a selected day
        const isSelectedDayVisible = !!grid.find(row => !!row.find(day => day.isActive));

        if (isSelectedDayVisible) {
            return item.isActive;
        }

        // otherwise make the first day tabbable
        return item.day === 1;
    }

    getDisabled(date: Date): boolean {

        // if we are not in range mode then it will always be enabled
        if (!this._isRangeMode || this._rangeStart && !!this._rangeEnd) {
            return false;
        }

        // if we are range start and dates are after the range end then they should also be disabled
        if (this._isRangeStart && this._rangeEnd && isDateAfter(date, this._rangeEnd)) {
            return true;
        }

        // if we are range end and dates are before the range start then they should also be disabled
        if (this._isRangeEnd && this._rangeStart && isDateBefore(date, this._rangeStart)) {
            return true;
        }

        return false;
    }

    isRangeStartDate(date: Date): boolean {
        return this._isRangeMode && this._rangeStart && compareDays(date, this._rangeStart);
    }

    isRangeEndDate(date: Date): boolean {
        return this._isRangeMode && this._rangeEnd && compareDays(date, this._rangeEnd);
    }

    isWithinRange(date: Date): boolean {
        return this._isRangeMode && this._rangeStart && isDateAfter(date, this._rangeStart) && isDateBefore(date, this._rangeEnd);
    }

    isDateHovered(date: Date): boolean {

        // if we are not in range mode or both start and end dates are selected then dont show range hover
        if (!this._isRangeMode || !this._rangeService.hover || this._rangeStart && this._rangeEnd) {
            return;
        }

        return this._rangeStart && isDateAfter(date, this._rangeStart) && isDateBefore(date, this._rangeService.hover, true) ||
            this._rangeEnd && isDateBefore(date, this._rangeEnd) && isDateAfter(date, this._rangeService.hover, true);
    }

    isItemActive(date: Date, isActive: boolean): boolean {
        if (!this._isRangeMode) {
            return isActive;
        }

        return this._isRangeStart && this._rangeStart && compareDays(this._rangeStart, date) ||
            this._isRangeEnd && this._rangeEnd && compareDays(this._rangeEnd, date);
    }

    onRangeMouseEnter(date: Date): void {
        if (this._isRangeMode) {
            this._rangeService.setDateMouseEnter(date);
        }
    }

    onRangeMouseLeave(date: Date): void {
        if (this._isRangeMode) {
            this._rangeService.setDateMouseLeave(date);
        }
    }

}