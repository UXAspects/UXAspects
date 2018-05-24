import { EventEmitter, OnDestroy } from '@angular/core';
import { DatePickerMode, DateTimePickerService, DateTimePickerTimezone } from './date-time-picker.service';
export declare class DateTimePickerComponent implements OnDestroy {
    datepicker: DateTimePickerService;
    private _timezone;
    showDate: boolean;
    showTime: boolean;
    showTimezone: boolean;
    showSeconds: boolean;
    showMeridian: boolean;
    showSpinners: boolean;
    weekdays: string[];
    nowBtnText: string;
    timezones: DateTimePickerTimezone[];
    dateChange: EventEmitter<Date>;
    timezoneChange: EventEmitter<DateTimePickerTimezone>;
    date: Date;
    timezone: DateTimePickerTimezone;
    DatePickerMode: typeof DatePickerMode;
    private _subscription;
    constructor(datepicker: DateTimePickerService);
    ngOnDestroy(): void;
    /**
     * Change the date to the current date and time
     */
    setToNow(): void;
}
