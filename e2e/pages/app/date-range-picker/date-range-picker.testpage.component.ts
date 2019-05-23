import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DateTimePickerTimezone, timezones } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.testpage.component.html',
    styleUrls: ['./date-range-picker.testpage.component.less'],
})
export class DateRangePickerTestPageComponent {
    /** The date in the left side of the date range picker */
    start = new Date(2019, 2, 4);

    /** The date in the right side of the date range picker */
    end = new Date(2019, 2, 21, 23, 59);

    /** The formatted date string to display in the input */
    date: string;

    /** Earliest selectable date. */
    min: Date;

    /** Latest selectable date. */
    max: Date;

    /** Indicate whether or not the selected date is valid */
    invalid: boolean = false;

    /** Indicate if the time picker should be visible */
    showTime: boolean = true;

    /** Indicate if the timezone picker should be visible */
    showTimezone: boolean = true;

    /** Indicate if the seconds on the time picker should be visible */
    showSeconds: boolean = false;

    /** Indicate if the meridian on the time picker should be visible */
    showMeridian: boolean = true;

    /** Indicate if the spinners on the time picker should be visible */
    showSpinners: boolean = true;

    /** Indicate if the show now should be visible */
    showNowBtn: boolean = false;

    /** Store the currently selected timezones */
    private _startTimezone: DateTimePickerTimezone = this.getCurrentTimezone();
    private _endTimezone: DateTimePickerTimezone = this.getCurrentTimezone();

    /** Parse a date string when the input changes */
    onDateChange(date: string): void {

        // reset any invalid state
        this.invalid = false;

        // check if the date contains a hyphen
        const parts = (date.indexOf('—') ? date.split('—') : date.split('-')).map(part => Date.parse(part.trim()));

        if (parts.length >= 1 && !isNaN(parts[0])) {
            this.start = new Date(parts[0]);
        } else if (parts.length >= 1 && isNaN(parts[0])) {
            this.invalid = true;
            this.start = null;
        }

        if (parts.length === 2 && !isNaN(parts[1])) {
            this.end = new Date(parts[1]);
        } else if (parts.length === 2 && isNaN(parts[1])) {
            this.invalid = true;
            this.end = null;
        }

        if (this.start && this.end && this.start.getTime() > this.end.getTime()) {
            this.invalid = true;
            this.start = null;
            this.end = null;
        }
    }

    /** Update the date string when the date range changes */
    onRangeChange(): void {
        const start = this.start ? formatDate(this.start, 'd MMMM y  h:mm a', 'en-US') + ' ' + this._startTimezone.name : '';
        const end = this.end ? formatDate(this.end, 'd MMMM y  h:mm a', 'en-US') + ' ' + this._endTimezone.name : '';

        if (!this.start || !this.end) {
            return;
        }

        // reset the invalid state
        this.invalid = false;

        // check if the dates are valid
        if (this.getNormalizedDate(this.start, this._startTimezone).getTime() > this.getNormalizedDate(this.end, this._endTimezone).getTime()) {
            this.invalid = true;
        }

        // concatenate the two dates
        this.date = start && end ? `${start} — ${end}` : start || end;
    }

    onTimezoneChange(isStart: boolean, timezone: DateTimePickerTimezone): void {
        if (isStart) {
            this._startTimezone = timezone;
        } else {
            this._endTimezone = timezone;
        }

        this.onRangeChange();
    }

    clear(): void {
        this.start = null;
        this.end = null;
        this.date = null;
        this.onRangeChange();
    }

    enableMinAndMax(): void {
        this.min = new Date(2019, 2, 5);
        this.max = new Date(2019, 3, 1, 23, 59);
    }

    disableMinAndMax(): void {
        this.min = null;
        this.max = null;
    }

    /** Account for the timezone offset */
    private getNormalizedDate(date: Date, timezone: DateTimePickerTimezone): Date {
        const normalizedDate = new Date(date);
        normalizedDate.setMinutes(normalizedDate.getMinutes() + timezone.offset);
        return normalizedDate;
    }

    private getCurrentTimezone(): DateTimePickerTimezone {
        return { ...timezones.find(timezone => timezone.offset === new Date().getTimezoneOffset()) };
    }
}