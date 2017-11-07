import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DateTimePickerTimeViewComponent, DateTimePickerTimezone } from './time-view/time-view.component';
import { weekdaysShort } from './date-time-picker.utils';

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

  @Input() showDate: boolean = true;
  @Input() showTime: boolean = true;
  @Input() showTimezone: boolean = true;
  @Input() showSeconds: boolean = false;
  @Input() showMeridian: boolean = true;
  @Input() showSpinners: boolean = true;
  @Input() weekdays: string[] = weekdaysShort;
  @Input() nowBtnText: string = 'Today';
  @Input() timezones: DateTimePickerTimezone[] = [
    { name: 'GMT-11', offset: -660 },
    { name: 'GMT-10', offset: -600 },
    { name: 'GMT-9', offset: -540 },
    { name: 'GMT-8', offset: -480 },
    { name: 'GMT-7', offset: -420 },
    { name: 'GMT-6', offset: -360 },
    { name: 'GMT-5', offset: -300 },
    { name: 'GMT-4', offset: -240 },
    { name: 'GMT-3', offset: -180 },
    { name: 'GMT-2', offset: -12 },
    { name: 'GMT-1', offset: -60 },
    { name: 'GMT', offset: 0 },
    { name: 'GMT+1', offset: 60 },
    { name: 'GMT+2', offset: 120 },
    { name: 'GMT+3', offset: 180 },
    { name: 'GMT+4', offset: 240 },
    { name: 'GMT+5', offset: 300 },
    { name: 'GMT+6', offset: 360 },
    { name: 'GMT+7', offset: 420 },
    { name: 'GMT+8', offset: 480 },
    { name: 'GMT+9', offset: 540 },
    { name: 'GMT+10', offset: 600 },
    { name: 'GMT+11', offset: 660 },
    { name: 'GMT+12', offset: 720 }
  ];

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
    const timezone = this.timezones.find(timezone => timezone.offset === value.offset);

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