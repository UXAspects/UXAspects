import { Component, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;

    parse(value: string): void {

        // try and parse the date
        const date = new Date(value);

        // check if the date is valid
        if (!isNaN(date.getDate())) {
            this.date = date;
        }
    }
}