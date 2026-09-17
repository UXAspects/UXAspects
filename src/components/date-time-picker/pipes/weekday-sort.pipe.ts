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

import { WeekDay } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'weekDaySort' })
export class WeekDaySortPipe implements PipeTransform {
  transform(value: string[], startOfWeek: WeekDay): string[] {
    // ensure start of week is in range
    startOfWeek = Math.max(WeekDay.Sunday, Math.min(WeekDay.Saturday, startOfWeek));

    // create a new array to avoid altering the original
    const weekdays = [...value];

    for (let idx = 0; idx < startOfWeek; idx++) {
      weekdays.push(weekdays.shift());
    }

    return weekdays;
  }
}
