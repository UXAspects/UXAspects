import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DateTimePickerTimeViewComponent, DateTimePickerTimezone } from './time-view/time-view.component';
import { weekdaysShort } from './date-time-picker.utils';
import { DateTimePickerConfig } from './date-time-picker.config';

@Component({
  selector: 'ux-date-time-picker',
  templateUrl: './date-time-picker.component.html'
})
export class DateTimePickerComponent {

  @ViewChild('timePicker') timePickerComponent: DateTimePickerTimeViewComponent;

  activeDate: Date = new Date();
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();

  private _date: Date = new Date();
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
    this._date = new Date(value);

    // update the month and year
    this.month = this._date.getMonth();
    this.year = this._date.getFullYear();

    // set the active date to the new date
    this.activeDate = new Date(value);
  }

  get date(): Date {
    return this._date;
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


  mode: DatePickerMode = DatePickerMode.Day;

  // expose enum to view
  DatePickerMode = DatePickerMode;

  constructor(private _config: DateTimePickerConfig) { }

  /**
   * This will emit the newly selected date
   */
  commit(): void {
    this.dateChange.emit(this.activeDate);
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

export enum DatePickerMode {
  Day,
  Month,
  Year
}