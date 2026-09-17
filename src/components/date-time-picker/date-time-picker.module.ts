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

import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { IconModule } from '../icon/index';
import { SpinButtonModule } from '../spin-button/index';
import { TimePickerModule } from '../time-picker/index';
import { DateTimePickerComponent } from './date-time-picker.component';
import { DateTimePickerConfig } from './date-time-picker.config';
import { DayViewComponent } from './day-view/day-view.component';
import { HeaderComponent } from './header/header.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { WeekDaySortPipe } from './pipes/weekday-sort.pipe';
import { TimeViewComponent } from './time-view/time-view.component';
import { YearViewComponent } from './year-view/year-view.component';

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    CommonModule,
    FocusIfModule,
    FormsModule,
    IconModule,
    SpinButtonModule,
    TimePickerModule,
    DateTimePickerComponent,
    HeaderComponent,
    DayViewComponent,
    MonthViewComponent,
    YearViewComponent,
    TimeViewComponent,
    WeekDaySortPipe,
  ],
  exports: [DateTimePickerComponent],
})
export class DateTimePickerModule {
  static forRoot(): ModuleWithProviders<DateTimePickerModule> {
    return {
      ngModule: DateTimePickerModule,
      providers: [DateTimePickerConfig],
    };
  }
}
