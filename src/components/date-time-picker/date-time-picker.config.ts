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

/**
 * Add a config service to allow an application
 * to customize the date time picker default settings
 * across the entire application
 */
import { Injectable } from '@angular/core';
import {
  DateTimePickerTimezone,
  meridians,
  months,
  monthsShort,
  timezones,
  weekdaysShort,
} from './date-time-picker.utils';

@Injectable()
export class DateTimePickerConfig {
  showDate: boolean = true;
  showTime: boolean = true;
  showTimezone: boolean = true;
  showSeconds: boolean = false;
  showMeridian: boolean = true;
  showSpinners: boolean = true;
  showNowBtn: boolean = true;
  weekdays: string[] = weekdaysShort;
  nowBtnText: string = 'Today';
  timezones: DateTimePickerTimezone[] = timezones;
  months: string[] = months;
  monthsShort: string[] = monthsShort;
  meridians: string[] = meridians;
  min: Date = null;
  max: Date = null;
}
