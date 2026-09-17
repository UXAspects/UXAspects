///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DateTimePickerService, ModeDirection } from '../date-time-picker.service';
import { gridify, range } from '../date-time-picker.utils';

@Injectable()
export class MonthViewService implements OnDestroy {
  private readonly _datepicker = inject(DateTimePickerService);

  grid$ = new BehaviorSubject<MonthViewItem[][]>([[]]);
  focused$ = new BehaviorSubject<FocusedMonthItem>(null);

  private readonly _subscription: Subscription;

  constructor() {
    this._subscription = this._datepicker.year$.subscribe(year => this.createMonthGrid(year));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  setFocus(month: number, year: number): void {
    this.focused$.next({ month, year });

    // update the viewport to ensure focused month is visible
    this._datepicker.setViewportYear(year);
  }

  private createMonthGrid(year: number): void {
    // update the header
    this._datepicker.setHeader(year.toString());

    // get the current year and month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // get the currently selected month
    const activeMonth = this._datepicker.selected$.value
      ? this._datepicker.selected$.value.getMonth()
      : null;
    const activeYear = this._datepicker.selected$.value
      ? this._datepicker.selected$.value.getFullYear()
      : null;

    // create a 4x3 grid of month numbers
    const months: MonthViewItem[] = range(0, 11).map(month => {
      return {
        name: this._datepicker.monthsShort[month],
        month,
        year,
        isCurrentMonth: year === currentYear && month === currentMonth,
        isActiveMonth: year === activeYear && month === activeMonth,
      };
    });

    // map these to the appropriate format
    const items: MonthViewItem[][] = gridify(months, 4);

    // update the grid
    this.grid$.next(items);

    // if there is no focused month select the first one
    if (this._datepicker.modeDirection === ModeDirection.Descend && this.focused$.value === null) {
      // check if the selected month is in view
      const selectedMonth = months.find(month => month.isActiveMonth);

      this.setFocus(selectedMonth ? selectedMonth.month : 0, year);
    }
  }
}

export interface MonthViewItem {
  name: string;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isActiveMonth: boolean;
}

export interface FocusedMonthItem {
  month: number;
  year: number;
}
