import { EventEmitter, OnDestroy } from '@angular/core';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { DateTimePickerTimezone } from './date-time-picker.utils';
export declare class DateTimePickerComponent implements OnDestroy {
    datepicker: DateTimePickerService;
    showDate: boolean;
    showTime: boolean;
    showTimezone: boolean;
    showSeconds: boolean;
    showMeridian: boolean;
    showSpinners: boolean;
    weekdays: string[];
    months: string[];
    monthsShort: string[];
    nowBtnText: string;
    timezones: DateTimePickerTimezone[];
    dateChange: EventEmitter<Date>;
    timezoneChange: EventEmitter<DateTimePickerTimezone>;
    date: Date;
    timezone: DateTimePickerTimezone;
    DatePickerMode: typeof DatePickerMode;
    private _onDestroy;
    constructor(datepicker: DateTimePickerService);
    ngOnDestroy(): void;
    /**
     * Change the date to the current date and time
     */
    setToNow(): void;
}
