import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePickerMode, DateTimePickerService } from '../date-time-picker.service';
import { YearViewService } from './year-view.service';

@Component({
  selector: 'ux-date-time-picker-year-view',
  templateUrl: './year-view.component.html',
  providers: [YearViewService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearViewComponent {

  constructor(private _datePicker: DateTimePickerService, public yearService: YearViewService) {}

  select(year: number): void {
    this._datePicker.setViewportYear(year);

    // show the month picker
    this._datePicker.setViewportMode(DatePickerMode.Month);
  }

}
