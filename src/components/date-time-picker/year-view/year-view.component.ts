import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Optional } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DateTimePickerService } from '../date-time-picker.service';
import { isDateAfter, isDateBefore } from '../date-time-picker.utils';
import { YearViewItem, YearViewService } from './year-view.service';

@Component({
    selector: 'ux-date-time-picker-year-view',
    templateUrl: './year-view.component.html',
    providers: [YearViewService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearViewComponent implements AfterViewInit, OnDestroy {

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

    get _minYear(): Date | null {
        return this._datePicker.min$.value ? new Date(this._datePicker.min$.value.getFullYear(), 0) : null;
    }

    get _maxYear(): Date | null {
        return this._datePicker.max$.value ? new Date(this._datePicker.max$.value.getFullYear(), 0) : null;
    }

    private _onDestroy = new Subject<void>();

    constructor(
        private _datePicker: DateTimePickerService,
        public yearService: YearViewService,
        private _liveAnnouncer: LiveAnnouncer,
        private _changeDetector: ChangeDetectorRef,
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions) {

        if (this._rangeService) {
            this._rangeService.onRangeChange.pipe(takeUntil(this._onDestroy)).subscribe(() => _changeDetector.detectChanges());
        }
    }

    ngAfterViewInit(): void {
        // update on min/max changes
        merge(this._datePicker.min$, this._datePicker.max$).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this._changeDetector.detectChanges());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    select(year: number): void {
        this._datePicker.setViewportYear(year);

        // show the month picker
        this._datePicker.goToChildMode();
    }

    /** Get the disabled state of a month */
    getDisabled(item: YearViewItem): boolean {

        const date = new Date(item.year, 0);

        // if we are not in range mode then it will always be enabled
        if (this._isRangeMode) {

            // if we are range start and dates are after the range end then they should also be disabled
            if (this._isRangeStart && !this._rangeStart && this._rangeEnd && isDateAfter(date, new Date(this._rangeEnd.getFullYear(), 0))) {
                return true;
            }

            // if we are range end and dates are before the range start then they should also be disabled
            if (this._isRangeEnd && !this._rangeEnd && this._rangeStart && isDateBefore(date, new Date(this._rangeStart.getFullYear(), 0))) {
                return true;
            }
        }

        if (this._minYear && isDateBefore(date, this._minYear)) {
            return true;
        }

        if (this._maxYear && isDateAfter(date, this._maxYear)) {
            return true;
        }

        return false;
    }

    focusYear(item: YearViewItem, yearOffset: number): void {
        this.yearService.setFocus(item.year + yearOffset);
    }

    trackRowByFn(index: number): number {
        return index;
    }

    trackYearByFn(_index: number, item: YearViewItem): number {
        return item.year;
    }

    getTabbable(item: YearViewItem): boolean {
        const focused = this.yearService.focused$.value;
        const grid = this.yearService.grid$.value;

        // if there is a focused year check if this is it
        if (focused) {

            // check if the focused year is visible
            const isFocusedYearVisible = !!grid.find(row => !!row.find(_item => _item.year === focused));

            if (isFocusedYearVisible) {
                return focused === item.year;
            }
        }

        // if there is no focusable year then check if there is a selected year
        const isSelectedYearVisible = !!grid.find(row => !!row.find(year => year.isActiveYear));

        if (isSelectedYearVisible) {
            return item.isActiveYear;
        }

        // otherwise find the first non-disabled month
        for (const row of this.yearService.grid$.value) {
            for (const column of row) {
                if (!this.getDisabled(column)) {
                    return item === column;
                }
            }
        }

        // otherwise make the first month tabbable
        return false;
    }

    /** Announce the date when we focus on a date */
    announceRangeMode(): void {
        if (this._isRangeMode) {
            this._liveAnnouncer.announce(this._isRangeStart ? this._rangeService.startPickerAriaLabel : this._rangeService.endPickerAriaLabel);
        }
    }

}
