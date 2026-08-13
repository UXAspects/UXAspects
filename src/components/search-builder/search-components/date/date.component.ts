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

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusIfDirective } from '../../../../directives/focus-if/focus-if.directive';
import { DateTimePickerComponent } from '../../../date-time-picker/date-time-picker.component';
import { IconComponent } from '../../../icon/icon.component';
import { PopoverDirective } from '../../../popover/popover.directive';
import { BaseSearchComponent, BaseSearchComponentConfig } from '../base-search.component';

@Component({
  selector: 'ux-search-date',
  templateUrl: './date.component.html',
  imports: [
    IconComponent,
    FormsModule,
    PopoverDirective,
    FocusIfDirective,
    DateTimePickerComponent,
    DatePipe,
  ],
})
export class SearchDateComponent extends BaseSearchComponent implements OnInit {
  type: string = 'date';

  get label(): string {
    return this.config.label;
  }

  get placeholder(): string {
    return this.config.placeholder || 'Enter date';
  }

  get dateInputAriaLabel(): string {
    return this.config.dateInputAriaLabel || 'Selected date';
  }

  ngOnInit(): void {
    // by default set to the current date if not specified
    if (!this.value) {
      this.value = new Date();
    }
  }
}

export interface SearchDateConfig extends BaseSearchComponentConfig {
  dateInputAriaLabel: string;
}
