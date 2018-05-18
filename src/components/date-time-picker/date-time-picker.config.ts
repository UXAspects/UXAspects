/**
 * Add a config service to allow an application
 * to customize the date time picker default settings
 * across the entire application
 */

import { Injectable } from '@angular/core';
import { weekdaysShort } from './date-time-picker.utils';
import { DateTimePickerTimezone } from './date-time-picker.service';

@Injectable()
export class DateTimePickerConfig {

    showDate: boolean = true;
    showTime: boolean = true;
    showTimezone: boolean = true;
    showSeconds: boolean = false;
    showMeridian: boolean = true;
    showSpinners: boolean = true;
    weekdays: string[] = weekdaysShort;
    nowBtnText: string = 'Today';

    timezones: DateTimePickerTimezone[] = [
        { name: 'GMT-11', offset: -660 },
        { name: 'GMT-10', offset: -600 },
        { name: 'GMT-9', offset: -540 },
        { name: 'GMT-8', offset: -480 },
        { name: 'GMT-7', offset: -420 },
        { name: 'GMT-6', offset: -360 },
        { name: 'GMT-5', offset: -300 },
        { name: 'GMT-4', offset: -240 },
        { name: 'GMT-3', offset: -180 },
        { name: 'GMT-2', offset: -12 },
        { name: 'GMT-1', offset: -60 },
        { name: 'GMT', offset: 0 },
        { name: 'GMT+1', offset: 60 },
        { name: 'GMT+2', offset: 120 },
        { name: 'GMT+3', offset: 180 },
        { name: 'GMT+4', offset: 240 },
        { name: 'GMT+5', offset: 300 },
        { name: 'GMT+6', offset: 360 },
        { name: 'GMT+7', offset: 420 },
        { name: 'GMT+8', offset: 480 },
        { name: 'GMT+9', offset: 540 },
        { name: 'GMT+10', offset: 600 },
        { name: 'GMT+11', offset: 660 },
        { name: 'GMT+12', offset: 720 }
    ];
}