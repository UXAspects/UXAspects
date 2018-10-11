import { Component, EventEmitter, Input, OnDestroy, Output, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, timezoneComparator, DateTimePickerTimezone } from './date-time-picker.utils';

@Component({
  selector: 'ux-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [DateTimePickerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements OnDestroy {

  private _timezone: DateTimePickerTimezone;

  @Input() set showDate(value: boolean) {
    this.datepicker.showDate$.next(value);
  }

  @Input() set showTime(value: boolean) {
    this.datepicker.showTime$.next(value);
  }

  @Input() set showTimezone(value: boolean) {
    this.datepicker.showTimezone$.next(value);
  }

  @Input() set showSeconds(value: boolean) {
    this.datepicker.showSeconds$.next(value);
  }

  @Input() set showMeridian(value: boolean) {
    this.datepicker.showMeridian$.next(value);
  }

  @Input() set showSpinners(value: boolean) {
    this.datepicker.showSpinners$.next(value);
  }

  @Input() set weekdays(value: string[]) {
    this.datepicker.weekdays$.next(value);
  }

  @Input() set nowBtnText(value: string) {
    this.datepicker.nowBtnText$.next(value);
  }

  @Input() set timezones(value: DateTimePickerTimezone[]) {
    this.datepicker.timezones$.next(value);
  }


  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() timezoneChange: EventEmitter<DateTimePickerTimezone> = new EventEmitter<DateTimePickerTimezone>();

  @Input()
  set date(value: Date) {
    if (!dateComparator(value, this.datepicker.selected$.value)) {
      this.datepicker.selected$.next(new Date(value));
    }
  }

  @Input()
  set timezone(value: DateTimePickerTimezone) {
    this.datepicker.timezone$.next(value);
  }

  // expose enum to view
  DatePickerMode = DatePickerMode;

  private _subscription = new Subscription();

  constructor(public datepicker: DateTimePickerService) {
    const valueChange = datepicker.selected$.pipe(distinctUntilChanged(dateComparator))
      .subscribe(date => this.dateChange.emit(date));

    const timezoneChange = datepicker.timezone$.pipe(distinctUntilChanged(timezoneComparator))
      .subscribe((timezone: DateTimePickerTimezone) => this.timezoneChange.emit(timezone));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Change the date to the current date and time
   */
  setToNow(): void {

    // set the date to the current moment
    this.datepicker.setDateToNow();
  }
}