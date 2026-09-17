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

import { formatDate } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateFormatter } from './date-formatter.type';

@Pipe({ name: 'formatDate' })
export class DateFormatterPipe implements PipeTransform {
  private readonly _locale = inject<string>(LOCALE_ID);

  transform(value: Date, formatter: string | DateFormatter): string {
    // we may not initially have  a value
    if (!value) {
      return '';
    }

    return typeof formatter === 'function'
      ? formatter(value)
      : formatDate(value, formatter, this._locale);
  }
}
