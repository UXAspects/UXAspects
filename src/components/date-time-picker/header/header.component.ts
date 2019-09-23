import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Optional } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';

@Component({
    selector: 'ux-date-time-picker-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

    canAscend$: Observable<boolean> = this.datepicker.mode$.pipe(map(mode => mode !== DatePickerMode.Year));

    mode$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Day';
            case DatePickerMode.Month:
                return 'Month';
            case DatePickerMode.Year:
                return 'Year';
        }
    }));

    headerAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Switch to show months in the year';
            case DatePickerMode.Month:
                return 'Switch to show years in the decade';
            case DatePickerMode.Year:
                return '';
        }
    }));

    previousAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Previous month';
            case DatePickerMode.Month:
                return 'Previous year';
            case DatePickerMode.Year:
                return 'Previous decade';
        }
    }));

    nextAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Next month';
            case DatePickerMode.Month:
                return 'Next year';
            case DatePickerMode.Year:
                return 'Next decade';
        }
    }));

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

    /** Unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    constructor(
        public datepicker: DateTimePickerService,
        private _changeDetector: ChangeDetectorRef,
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions
    ) {
        if (this._rangeService) {
            // delay required to allow all ui to update elsewhere
            this._rangeService.onRangeChange.pipe(takeUntil(this._onDestroy), delay(100))
                .subscribe(() => _changeDetector.detectChanges());
        }
    }

    ngAfterViewInit(): void {
        // update on min/max changes
        merge(this.datepicker.min$, this.datepicker.max$).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this._changeDetector.detectChanges());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Navigate to the previous day, month or year */
    previous(): void {
        this.datepicker.goToPrevious();
    }

    /** Navigate to the larger scale, eg. Days -> Months, Months -> Years */
    ascend(): void {
        this.datepicker.goToParentMode();
    }

    /** Navigate to the previous day, month or year */
    next(): void {
        this.datepicker.goToNext();
    }

    /** Determine if the previous button is enabled */
    isPreviousDisabled(): boolean {

        const min = this.datepicker.min$.value;

        if (min && this._isBeforeView(min)) {
            return true;
        }

        // if we are not in range mode or there are no disabled items then we can navigate back
        if (!this._isRangeMode || this._rangeStart && this._rangeEnd ||
            !this._rangeStart && !this._rangeEnd || this._isRangeStart
            || this._isRangeEnd && this._rangeEnd) {
            return false;
        }

        if (this._isBeforeView(this._rangeStart)) {
            return true;
        }

        return false;
    }

    /** Determine if the previous button is enabled */
    isNextDisabled(): boolean {

        const max = this.datepicker.max$.value;

        if (max && this._isAfterView(max)) {
            return true;
        }

        // if we are not in range mode or there are no disabled items then we can navigate back
        if (!this._isRangeMode || this._rangeStart && this._rangeEnd ||
            !this._rangeStart && !this._rangeEnd || this._isRangeStart && this._rangeStart
            || this._isRangeEnd) {
            return false;
        }

        if (this._isAfterView(this._rangeEnd)) {
            return true;
        }

        return false;
    }

    private _isBeforeView(date: Date): boolean {

        const month = this.datepicker.month$.value;
        const year = this.datepicker.year$.value;
        const mode = this.datepicker.mode$.value;
        const yearRange = this.datepicker.yearRange;

        if (mode === DatePickerMode.Day) {
            return year <= date.getFullYear() && month <= date.getMonth();
        }

        if (mode === DatePickerMode.Month) {
            return year <= date.getFullYear();
        }

        if (mode === DatePickerMode.Year) {
            return yearRange.start <= date.getFullYear();
        }
    }

    private _isAfterView(date: Date): boolean {

        const month = this.datepicker.month$.value;
        const year = this.datepicker.year$.value;
        const mode = this.datepicker.mode$.value;
        const yearRange = this.datepicker.yearRange;

        if (mode === DatePickerMode.Day) {
            return year >= date.getFullYear() && month >= date.getMonth();
        }

        if (mode === DatePickerMode.Month) {
            return year >= date.getFullYear();
        }

        if (mode === DatePickerMode.Year) {
            return yearRange.end >= date.getFullYear();
        }
    }
}