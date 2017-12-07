import { EventEmitter } from '@angular/core';
import { DateTimePickerTimeViewComponent, DateTimePickerTimezone } from './time-view/time-view.component';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DateTimePickerService } from './date-time-picker.service';
export declare class DateTimePickerComponent {
    private _config;
    dateTimePickerService: DateTimePickerService;
    timePickerComponent: DateTimePickerTimeViewComponent;
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
    constructor(_config: DateTimePickerConfig, dateTimePickerService: DateTimePickerService);
    /**
     * This will emit the newly selected date
     */
    commit(): void;
    /**
     * Change the date to the current date and time
     */
    setToNow(): void;
}
export declare enum DatePickerMode {
    Day = 0,
    Month = 1,
    Year = 2,
}
