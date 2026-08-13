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
 * This directive allows us to pass information down to a specific ux-date-time-picker
 * without having to expose additional inputs to the consuming application.
 *
 * For example, the day picker needs to know if it is the start or end picker
 * as the behavior will be different for each. However we don't want to expose an
 * input on the DateTimePickerComponent as this will appear in Editor Autocomplete Suggestions
 * options if the Angular Language Service is installed, and we don't want these to be public
 * options.
 */
import { Directive, inject, Input } from '@angular/core';
import { DateRangePicker } from './date-range.service';

export class DateRangeOptions {
  picker: DateRangePicker = DateRangePicker.Start;
}

@Directive({
  selector: '[uxDateRangePicker]',
  providers: [DateRangeOptions],
})
export class DateRangePickerDirective {
  private readonly _options = inject(DateRangeOptions, { self: true });

  /** Specify whether this is the start or end picker */
  @Input() set picker(picker: DateRangePicker) {
    this._options.picker = picker;
  }
}
