import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DateTimePickerTimezone } from '../../../../dist';

@Component({
    selector: 'date-time-picker-app',
    templateUrl: './date-time-picker.testpage.component.html',
    styleUrls: ['./date-time-picker.testpage.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DateTimePickerTestPageComponent {

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };
    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;

}
