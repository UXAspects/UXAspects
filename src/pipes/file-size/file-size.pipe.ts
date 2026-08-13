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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  transform(value: number): string | number {
    // allow for async values
    if (!value) {
      return value;
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    // calculate the which unit bracket the values should be a part of
    const idx = Math.floor(Math.log(value) / Math.log(1024));
    const formattedValue = value / Math.pow(1024, idx);

    return `${formattedValue.toFixed(2)} ${units[idx]}`;
  }
}
