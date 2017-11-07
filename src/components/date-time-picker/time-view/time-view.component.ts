import { Component, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Component({
    selector: 'ux-date-time-picker-time-view',
    templateUrl: './time-view.component.html'
})
export class DateTimePickerTimeViewComponent implements AfterViewInit {

    @Input() date: Date = new Date();
    @Input() showSeconds: boolean = false;
    @Input() showSpinners: boolean = true;
    @Input() showTimezone: boolean = true;
    @Input() showMeridian: boolean = true;

    @Input() timezones: DateTimePickerTimezone[];

    @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() timezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

    meridian: DatePickerMeridian = DatePickerMeridian.AM;

    @Input() 
    set timezone(value: DateTimePickerTimezone) {
        if (value !== this._timezone) {
            this._timezone = value;
            this.timezoneChange.emit(this._timezone);
        }
    }

    get timezone() {
        return this._timezone;
    }

    // Expose enum to view
    DatePickerMeridian = DatePickerMeridian;

    private _timezone: DateTimePickerTimezone;

    ngAfterViewInit(): void {

        // if the user did not specify a timezone - choose a default one
        if (!this.timezone) {
            setTimeout(() => this.setDefaultTimezone());
        }
    }

    setDefaultTimezone(): void {
        // determine the user default timezone
        const offset = new Date().getTimezoneOffset();

        // find the closest timezone
        this.timezone = this.timezones.find(zone => zone.offset === offset);

        // if not match was found then set to GMT
        if (!this.timezone) {
            this.timezone = this.timezones.find(zone => zone.offset === 0);
        }
    }

    update(date: Date | null): void {

        // if the date is invalid then stop here
        if (!date) {
            return;
        }

        // update the meridian
        this.meridian = date.getHours() < 12 ? DatePickerMeridian.AM : DatePickerMeridian.PM;

        // if the date has not changed then don't emit
        if (date.getTime() !== this.date.getTime()) {
            this.date = date;
            this.dateChange.emit(date);
        }
    }

    setMeridian(meridian: DatePickerMeridian): void {

        // get the current hours
        const hours = this.date.getHours();

        // if we are transitioning to AM and time is currently PM
        if (meridian === DatePickerMeridian.AM && hours >= 12) {
            this.date.setHours(hours - 12);
            this.dateChange.emit(this.date);
        }

        // if we are transitioning to PM and time is currently AM
        if (meridian === DatePickerMeridian.PM && hours < 12) {
            this.date.setHours(hours + 12);
            this.dateChange.emit(this.date);
        }
    }

    previousTimezone(): void {

        // get the current zone
        const currentZone = this.timezones.findIndex(zone => zone.name === this.timezone.name && zone.offset === this.timezone.offset);

        // try to get the previous zone
        this.timezone = this.timezones[currentZone - 1] ? this.timezones[currentZone - 1] : this.timezones[currentZone];
    }

    nextTimezone(): void {
        // get the current zone
        const currentZone = this.timezones.findIndex(zone => zone.name === this.timezone.name && zone.offset === this.timezone.offset);

        // try to get the next zone
        this.timezone = this.timezones[currentZone + 1] ? this.timezones[currentZone + 1] : this.timezones[currentZone];
    }
}

export enum DatePickerMeridian {
    AM,
    PM
}

export interface DateTimePickerTimezone {
    name: string;
    offset: number;
}