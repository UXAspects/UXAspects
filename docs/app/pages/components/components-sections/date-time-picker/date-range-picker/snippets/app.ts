import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone, timezones } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    /** The date in the left side of the date range picker */
    start: Date;

    /** The date in the right side of the date range picker */
    end: Date;

    /** The formatted date string to display in the input */
    date: string;

    /** Indicate whether or not the selected date is valid */
    invalid: boolean = false;

    /** Indicate if the time picker should be visible */
    showTime: boolean = false;

    /** Indicate if the timezone picker should be visible */
    showTimezone: boolean = false;

    /** Indicate if the seconds on the time picker should be visible */
    showSeconds: boolean = false;

    /** Indicate if the meridian on the time picker should be visible */
    showMeridian: boolean = true;

    /** Indicate if the spinners on the time picker should be visible */
    showSpinners: boolean = true;

    /** Indicate if the show now should be visible */
    showNowBtn: boolean = false;

    /** Store the currently selected start timezone */
    startTimezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    /** Store the currently selected end timezone */
    endTimezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    /** Parse a date string when the input changes */
    onDateChange(date: string): void {

        // reset any invalid state
        this.invalid = false;

        // check if the date contains a hyphen
        const parts = (date.indexOf('—') ? date.split('—') : date.split('-'));
        const startDate = Date.parse(parts[0].trim());
        const endDate = Date.parse(parts[1].trim());

        if (!isNaN(startDate)) {
            this.start = new Date(startDate);
            this.startTimezone = this.getTimezone(parts[0]);
        } else if (parts.length >= 1 && isNaN(startDate)) {
            this.invalid = true;
            this.start = null;
        }

        if (!isNaN(endDate)) {
            this.end = new Date(endDate);
            this.endTimezone = this.getTimezone(parts[1]);
        } else if (parts.length === 2 && isNaN(endDate)) {
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
        const start = this.start ?
            formatDate(this.start, 'd MMMM y  h:mm a', 'en-US') + ' ' + this.startTimezone.name : '';
        const end = this.end ?
            formatDate(this.end, 'd MMMM y  h:mm a', 'en-US') + ' ' + this.endTimezone.name : '';

        if (!this.start || !this.end) {
            return;
        }

        // reset the invalid state
        this.invalid = false;

        // check if the dates are valid
        if (this.getNormalizedDate(this.start, this.startTimezone).getTime() >
            this.getNormalizedDate(this.end, this.endTimezone).getTime()) {
            this.invalid = true;
        }

        // concatenate the two dates
        this.date = start && end ? `${start} — ${end}` : start || end;
    }

    onTimezoneChange(isStart: boolean, timezone: DateTimePickerTimezone): void {
        if (isStart) {
            this.startTimezone = timezone;
        } else {
            this.endTimezone = timezone;
        }

        this.onRangeChange();
    }

    clear(): void {
        this.start = null;
        this.end = null;
        this.date = null;
        this.startTimezone = { name: 'GMT', offset: 0 };
        this.endTimezone = { name: 'GMT', offset: 0 };
        this.onRangeChange();
    }

    private getTimezone(date: string): DateTimePickerTimezone {

        // get the timezone from the datestring
        const timezone = date.match(/GMT(\+|-)([0-9]+)/gi);

        // check if there is a matching timezone
        if (timezone === null) {
            return { name: 'GMT', offset: 0 };
        } else {
            const match = timezones.find(_timezone =>
                _timezone.name.toLowerCase() === timezone[0].trim().toLowerCase());
            return match ? match : { name: 'GMT', offset: 0 };
        }
    }

    /** Account for the timezone offset */
    private getNormalizedDate(date: Date, timezone: DateTimePickerTimezone): Date {
        const normalizedDate = new Date(date);
        normalizedDate.setMinutes(normalizedDate.getMinutes() + timezone.offset);
        return normalizedDate;
    }
}