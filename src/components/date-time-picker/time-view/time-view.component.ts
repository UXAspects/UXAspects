import { ChangeDetectionStrategy, Component, OnDestroy, Optional } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DateRangeOptions } from '../../date-range-picker/date-range-picker.directive';
import { DateRangePicker, DateRangeService } from '../../date-range-picker/date-range.service';
import { DateTimePickerService } from '../date-time-picker.service';

@Component({
    selector: 'ux-date-time-picker-time-view',
    templateUrl: './time-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeViewComponent implements OnDestroy {

    /** Dont bind directly to the selected date as if it's null we can end up in 1970! */
    value: Date;

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
        @Optional() private _rangeService: DateRangeService,
        @Optional() private _rangeOptions: DateRangeOptions) {

        if (!this._isRangeMode) {
            datepicker.selected$.pipe(takeUntil(this._onDestroy), filter(date => !!date)).subscribe(date => this.value = new Date(date));
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

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onTimeChange(time: Date): void {

        if (this._isRangeMode) {

            // TODO: We need to ensure that if the start and end date are the same day that the end time is not before the start time and vice versa
            if (this._isRangeStart && this._rangeEnd) {

            }

            this.datepicker.hours = time.getHours();
            this.datepicker.minutes = time.getMinutes();
            this.datepicker.seconds = time.getSeconds();

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
}