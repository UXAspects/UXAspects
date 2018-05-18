import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DatePickerHeaderEvent, DateTimePickerService } from '../date-time-picker.service';
import { DayViewService } from './day-view.service';

@Component({
  selector: 'ux-date-time-picker-day-view',
  templateUrl: './day-view.component.html',
  providers: [DayViewService]
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
  select(date: Date): void {
    // update the current date object
    this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());
  }
}

export interface DatePickerDay {
  date: Date;
  today: boolean;
  active: boolean;
  currentMonth: boolean;
}