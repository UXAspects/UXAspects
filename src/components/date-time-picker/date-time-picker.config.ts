/**
 * Add a config service to allow an application
 * to customize the date time picker default settings
 * across the entire application
 */

import { Injectable } from '@angular/core';
import { DateTimePickerTimezone, meridians, months, monthsShort, timezones, weekdaysShort } from './date-time-picker.utils';

@Injectable()
export class DateTimePickerConfig {

    showDate: boolean = true;
    showTime: boolean = true;
    showTimezone: boolean = true;
    showSeconds: boolean = false;
    showMeridian: boolean = true;
    showSpinners: boolean = true;
    showNowBtn: boolean = true;
    weekdays: string[] = weekdaysShort;
    nowBtnText: string = 'Today';
    timezones: DateTimePickerTimezone[] = timezones;
    months: string[] = months;
    monthsShort: string[] = monthsShort;
    meridians: string[] = meridians;
    min: Date = null;
    max: Date = null;
}