import { EventEmitter, AfterViewInit } from '@angular/core';
export declare class DateTimePickerTimeViewComponent implements AfterViewInit {
    date: Date;
    showSeconds: boolean;
    showSpinners: boolean;
    showTimezone: boolean;
    showMeridian: boolean;
    timezones: DateTimePickerTimezone[];
    dateChange: EventEmitter<Date>;
    timezoneChange: EventEmitter<DateTimePickerTimezone>;
    meridian: DatePickerMeridian;
    timezone: DateTimePickerTimezone;
    DatePickerMeridian: typeof DatePickerMeridian;
    private _timezone;
    ngAfterViewInit(): void;
    setDefaultTimezone(): void;
    update(date: Date | null): void;
    setMeridian(meridian: DatePickerMeridian): void;
    previousTimezone(): void;
    nextTimezone(): void;
}
export declare enum DatePickerMeridian {
    AM = 0,
    PM = 1,
}
export interface DateTimePickerTimezone {
    name: string;
    offset: number;
}
