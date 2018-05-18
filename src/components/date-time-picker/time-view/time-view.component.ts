import { Component } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';

@Component({
    selector: 'ux-date-time-picker-time-view',
    templateUrl: './time-view.component.html'
})
export class TimeViewComponent {

    constructor(public datepicker: DateTimePickerService) { }

}