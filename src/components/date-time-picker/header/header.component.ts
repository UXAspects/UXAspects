import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';

@Component({
    selector: 'ux-date-time-picker-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    canAscend$: Observable<boolean> = this.datepicker.mode$.pipe(map(mode => mode !== DatePickerMode.Year));
    
    mode$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Day';
            case DatePickerMode.Month:
                return 'Month';
            case DatePickerMode.Year:
                return 'Year';
        }
    }));

    headerAria$: Observable<string> = this.datepicker.mode$.pipe(map(mode => {
        switch (mode) {
            case DatePickerMode.Day:
                return 'Switch to show months in the year';
            case DatePickerMode.Month:
                return 'Switch to show years in the decade';
            case DatePickerMode.Year:
                return '';
        }
    }));

    constructor(public datepicker: DateTimePickerService) { }

    previous(): void {
        this.datepicker.goToPrevious();
    }

    ascend(): void {
        this.datepicker.goToParentMode();
    }

    next(): void {
        this.datepicker.goToNext();
    }
}