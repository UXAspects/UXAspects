import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DatePickerMode, DateTimePickerService } from './date-time-picker.service';
import { dateComparator, DateTimePickerTimezone, timezoneComparator } from './date-time-picker.utils';

@Component({
  selector: 'ux-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  providers: [DateTimePickerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements OnDestroy {

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

  @Input() set months(months: string[]) {
    this.datepicker.months = months;
  }

  @Input() set monthsShort(months: string[]) {
    this.datepicker.monthsShort = months;
  }

  @Input() set meridians(meridians: string[]) {
    this.datepicker.meridians = meridians;
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

  private _onDestroy = new Subject<void>();

  constructor(public datepicker: DateTimePickerService) {
    datepicker.selected$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(dateComparator))
      .subscribe(date => this.dateChange.emit(date));

    datepicker.timezone$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(timezoneComparator))
      .subscribe((timezone: DateTimePickerTimezone) => this.timezoneChange.emit(timezone));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Change the date to the current date and time
   */
  setToNow(): void {

    // set the date to the current moment
    this.datepicker.setDateToNow();
  }
}