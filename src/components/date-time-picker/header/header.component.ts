import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';

@Component({
    selector: 'ux-date-time-picker-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    canAscend$: Observable<boolean> = this.datePicker.mode$.pipe(map(mode => mode !== DatePickerMode.Year));
    
    constructor(public datePicker: DateTimePickerService) { }

    previous(): void {
        this.datePicker.goToPrevious();
    }

    ascend(): void {
        this.datePicker.goToParentMode();
    }

    next(): void {
        this.datePicker.goToNext();
    }
}