import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, Optional } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DateTimePickerService } from '../date-time-picker.service';
import { compareDays } from '../date-time-picker.utils';

@Component({
    selector: 'ux-date-time-picker-time-view',
    templateUrl: './time-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeViewComponent implements OnInit, OnDestroy {

    /** Dont bind directly to the selected date as if it's null we can end up in 1970! */
    value: Date;

    /** Earliest time permitted on the time picker. */
    min: Date = null;

    /** Latest time permitted on the time picker. */
    max: Date = null;

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

    constructor(
        public datepicker: DateTimePickerService,
        private _changeDetector: ChangeDetectorRef,
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions) {

        // when the date changes we should update the value
        datepicker.date$.pipe(filter(date => date && this.value instanceof Date), takeUntil(this._onDestroy)).subscribe(date => {

            this.value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

            _changeDetector.detectChanges();
        });

        if (!this._isRangeMode) {
            datepicker.selected$.pipe(filter(date => !!date), takeUntil(this._onDestroy))
                .subscribe(date => this.value = new Date(date));
        }

        if (this._isRangeMode && this._isRangeStart) {
            this.value = new Date();
            if (!this._rangeStart) {
                this.value.setHours(0, 0, 0, 0);
            } else {
                this.value.setHours(this._rangeStart.getHours(), this._rangeStart.getMinutes(), this._rangeStart.getSeconds());
            }
        }

        if (this._isRangeMode && this._isRangeEnd) {
            this.value = new Date();
            if (!this._rangeEnd) {
                this.value.setHours(23, 59, 59, 0);
            } else {
                this.value.setHours(this._rangeEnd.getHours(), this._rangeEnd.getMinutes(), this._rangeEnd.getSeconds());
            }
        }
    }

    ngOnInit(): void {

        // min should only apply if it's on the same day as the selected date
        combineLatest(this.datepicker.min$, this.datepicker.date$).pipe(takeUntil(this._onDestroy)).subscribe(([min, date]) => {
            this.min = (min && date && compareDays(date, min)) ? min : null;
            this._changeDetector.detectChanges();
        });

        // max should only apply if it's on the same day as the selected date
        combineLatest(this.datepicker.max$, this.datepicker.date$).pipe(takeUntil(this._onDestroy)).subscribe(([max, date]) => {
            this.max = (max && date && compareDays(date, max)) ? max : null;
            this._changeDetector.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onTimeChange(time: Date): void {

        if (this._isRangeMode) {
            this.datepicker.hours = time.getHours();
            this.datepicker.minutes = time.getMinutes();
            this.datepicker.seconds = time.getSeconds();

            // update the time in the range picker service
            if (this._isRangeStart) {
                this._rangeService.startTime = { hours: time.getHours(), minutes: time.getMinutes(), seconds: time.getSeconds() };
            } else {
                this._rangeService.endTime = { hours: time.getHours(), minutes: time.getMinutes(), seconds: time.getSeconds() };
            }

            // if a date is currently selected we should update it
            if (this._isRangeStart && this._rangeStart) {
                const start = new Date(this._rangeStart);
                start.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
                this._rangeService.setStartDate(start);
            }

            if (this._isRangeEnd && this._rangeEnd) {
                const end = new Date(this._rangeEnd);
                end.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
                this._rangeService.setEndDate(end);
            }

            return;
        }

        // if the selected time is null then do nothing
        if (!this.datepicker.selected$.value) {
            return;
        }

        // otherwise set the time
        const date = new Date(this.datepicker.selected$.value);

        // update the time
        date.setHours(time.getHours(), time.getMinutes(), time.getSeconds());

        // emit the time
        this.datepicker.selected$.next(date);
    }

    selectTimezone(name: string): void {
        const timezones = this.datepicker.timezones$.value;

        // find matching timezone
        const timezone = timezones.find(_timezone => _timezone.name === name);

        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    }

    incrementTimezone(): void {
        const timezone = this.datepicker.timezone$.value;
        const timezones = this.datepicker.timezones$.value;

        const currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);

        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    }

    decrementTimezone(): void {
        const timezone = this.datepicker.timezone$.value;
        const timezones = this.datepicker.timezones$.value;

        const currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);

        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    }

    @HostListener('focusin')
    onFocusWithin(): void {
        if (this._isRangeMode) {
            this._rangeService.isChangingTime = true;
        }
    }

    @HostListener('focusout')
    onFocusOut(): void {
        if (this._isRangeMode) {
            this._rangeService.isChangingTime = false;
        }
    }
}