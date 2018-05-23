import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';

@Component({
    selector: 'ux-date-time-picker-time-view',
    templateUrl: './time-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeViewComponent {

    constructor(public datepicker: DateTimePickerService) { }

    selectTimezone(name: string): void {
        const timezones = this.datepicker.timezones$.value;
        
        // find matching timezone
        const timezone = timezones.find(_timezone => _timezone.name === name);

        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    }

    incrementTimezone(): void {
        const timezone = this.datepicker.timezone$.value;
        const timezones = this.datepicker.timezones$.value;

        const currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);

        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    }

    decrementTimezone(): void {
        const timezone = this.datepicker.timezone$.value;
        const timezones = this.datepicker.timezones$.value;

        const currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);

        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    }
}