import { Component } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.testpage.component.html',
    styleUrls: ['./date-time-picker.testpage.component.less'],
})
export class DateTimePickerTestPageComponent {

    date: Date = new Date(2019, 0, 3, 12);
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };
    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;
    startOfWeek: number = 0;
    min: Date;
    max: Date;

    setDateLimits(): void {
        this.min = new Date(2019, 0, 2);
        this.max = new Date(2019, 0, 28);
    }
}