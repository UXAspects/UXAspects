import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DateTimePickerService, DatePickerMode } from './date-time-picker.service';
import { DateTimePickerTimeViewComponent, DateTimePickerTimezone } from './time-view/time-view.component';

@Component({
  selector: 'ux-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [DateTimePickerService]
})
export class DateTimePickerComponent {

  @ViewChild('timePicker') timePickerComponent: DateTimePickerTimeViewComponent;

  private _timezone: DateTimePickerTimezone;

  @Input() showDate: boolean = this._config.showDate;
  @Input() showTime: boolean = this._config.showTime;
  @Input() showTimezone: boolean = this._config.showTimezone;
  @Input() showSeconds: boolean = this._config.showSeconds;
  @Input() showMeridian: boolean = this._config.showMeridian;
  @Input() showSpinners: boolean = this._config.showSpinners;
  @Input() weekdays: string[] = this._config.weekdays;
  @Input() nowBtnText: string = this._config.nowBtnText;
  @Input() timezones: DateTimePickerTimezone[] = this._config.timezones;

  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() timezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

  @Input()
  set date(value: Date) {

    this.dateTimePickerService.date.next(new Date(value));

    // set the active date to the new date
    this.dateTimePickerService.activeDate.next(new Date(value));
  }

  get date(): Date {
    return this.dateTimePickerService.date.getValue();
  }

  @Input()
  set timezone(value: DateTimePickerTimezone) {
    const timezone = this.timezones.find(zone => zone.offset === value.offset);

    // only update if the timezone is valid
    if (timezone) {
      this._timezone = timezone;
    }
  }

  get timezone(): DateTimePickerTimezone {
    return this._timezone;
  }

  // expose enum to view
  DatePickerMode = DatePickerMode;

  constructor(private _config: DateTimePickerConfig, public dateTimePickerService: DateTimePickerService) { }

  /**
   * This will emit the newly selected date
   */
  commit(): void {
    this.dateChange.emit(this.dateTimePickerService.activeDate.getValue());
  }

  /**
   * Change the date to the current date and time
   */
  setToNow(): void {

    // set the date to the current moment
    this.date = new Date();

    // reset the timezone to the default
    if (this.timePickerComponent) {
      this.timePickerComponent.setDefaultTimezone();
    }

    // emit the changes
    this.commit();
  }
}