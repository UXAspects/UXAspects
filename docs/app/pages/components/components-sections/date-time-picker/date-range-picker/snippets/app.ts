import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';

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

    /** Store the currently selected timezone */
    private _timezone: DateTimePickerTimezone;

    /** Parse a date string when the input changes */
    onDateChange(date: string): void {

        // reset any invalid state
        this.invalid = false;

        // check if the date contains a hyphen
        const parts = (date.indexOf('—') ? date.split('—') :
            date.split('-')).map(part => Date.parse(part.trim()));

        if (parts.length >= 1 && !isNaN(parts[0])) {
            this.start = new Date(parts[0]);
        } else if (parts.length >= 1 && isNaN(parts[0])) {
            this.invalid = true;
        }

        if (parts.length === 2 && !isNaN(parts[1])) {
            this.end = new Date(parts[1]);
        } else if (parts.length === 2 && isNaN(parts[1])) {
            this.invalid = true;
        }

        if (this.start.getTime() > this.end.getTime()) {
            this.invalid = true;
            this.start = null;
            this.end = null;
        }
    }

    /** Update the date string when the date range changes */
    onRangeChange(): void {
        const timezone = this._timezone ? this._timezone.name : 'GMT';
        const start = this.start ? formatDate(this.start, 'd MMMM y  h:mm a', 'en-US') + ' ' + timezone : '';
        const end = this.end ? formatDate(this.end, 'd MMMM y  h:mm a', 'en-US') + ' ' + timezone : '';

        if (!this.start || !this.end) {
            return;
        }

        // concatenate the two dates
        this.date = start && end ? `${start} — ${end}` : start || end;
    }

    onTimezoneChange(timezone: DateTimePickerTimezone): void {
        this._timezone = timezone;
        this.onRangeChange();
    }
}