import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService, DateTimePickerTimezone } from './date-time-picker.service';
import { dateComparator } from './date-time-picker.utils';
// import { DateTimePickerTimeViewComponent, DateTimePickerTimezone } from './time-view/time-view.component';

@Component({
  selector: 'ux-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [DateTimePickerService]
})
export class DateTimePickerComponent implements OnDestroy {

  // @ViewChild('timePicker') timePickerComponent: DateTimePickerTimeViewComponent;

  private _timezone: DateTimePickerTimezone;

  @Input() set showDate(value: boolean) {
    this.datePicker.showDate$.next(value);
  }

  @Input() set showTime(value: boolean) {
    this.datePicker.showTime$.next(value);
  }

  @Input() set showTimezone(value: boolean) {
    this.datePicker.showTimezone$.next(value);
  }

  @Input() set showSeconds(value: boolean) {
    this.datePicker.showSeconds$.next(value);
  }

  @Input() set showMeridian(value: boolean) {
    this.datePicker.showMeridian$.next(value);
  }

  @Input() set showSpinners(value: boolean) {
    this.datePicker.showSpinners$.next(value);
  }

  @Input() set weekdays(value: string[]) {
    this.datePicker.weekdays$.next(value);
  }

  @Input() set nowBtnText(value: string) {
    this.datePicker.nowBtnText$.next(value);
  }

  @Input() set timezones(value: DateTimePickerTimezone[]) {
    this.datePicker.timezones$.next(value);
  }


  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() timezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

  @Input()
  set date(value: Date) {
    if (!dateComparator(value, this.datePicker.selected$.value)) {
      this.datePicker.selected$.next(new Date(value));
    }
  }

  @Input()
  set timezone(value: DateTimePickerTimezone) {
    const timezone = this.datePicker.timezones$.value.find(zone => zone.offset === value.offset);

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

  private _subscription: Subscription;

  constructor(public datePicker: DateTimePickerService) {
    this._subscription = this.datePicker.selected$.pipe(distinctUntilChanged(dateComparator))
      .subscribe(date => this.dateChange.emit(date));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Change the date to the current date and time
   */
  setToNow(): void {

    // set the date to the current moment
    this.datePicker.setDateToNow();

    // reset the timezone to the default
    // if (this.timePickerComponent) {
      // this.timePickerComponent.setDefaultTimezone();
    // }
  }
}