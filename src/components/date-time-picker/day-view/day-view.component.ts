import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { DayViewItem, DayViewService } from './day-view.service';

@Component({
  selector: 'ux-date-time-picker-day-view',
  templateUrl: './day-view.component.html',
  providers: [DayViewService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayViewComponent implements OnDestroy {

  private _subscription: Subscription;

  constructor(public datePicker: DateTimePickerService, public dayService: DayViewService) {
    this._subscription = datePicker.headerEvent$
      .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Navigate to the previous page of dates
   */
  previous(): void {
    this.datePicker.setViewportMonth(this.datePicker.month$.value - 1);
  }

  /**
   * Navigate to the next page of dates
   */
  next(): void {
    this.datePicker.setViewportMonth(this.datePicker.month$.value + 1);
  }

  /**
   * Select a particular date
   * @param date the date to select
   */
  select(date: Date, element: HTMLElement): void {
    // update the current date object
    this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());

    // focus the newly selected date
    this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());
  }

  trackWeekByFn(index: number): number {
    return index;
  }

  trackDayByFn(index: number, item: DayViewItem): string {
    return `${ item.day } ${ item.month } ${ item.year }`;
  }

  focusDate(item: DayViewItem, dayOffset: number): void {

    // determine the date of the day
    const target = new Date(item.date.setDate(item.date.getDate() + dayOffset));

    // identify which date should be focused
    this.dayService.setFocus(target.getDate(), target.getMonth(), target.getFullYear());
  }

}