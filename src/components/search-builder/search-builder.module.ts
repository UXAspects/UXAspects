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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';
import { IconModule } from '../icon/index';
import { PopoverModule } from '../popover/index';
import { SelectModule } from '../select/index';
import { SearchBuilderGroupComponent } from './search-builder-group/search-builder-group.component';
import { SearchBuilderOutletDirective } from './search-builder-outlet/search-builder-outlet.directive';
import { SearchBuilderComponent } from './search-builder.component';
import { BaseSearchComponent } from './search-components/base-search.component';
import { SearchDateRangeComponent } from './search-components/date-range/date-range.component';
import { SearchDateComponent } from './search-components/date/date.component';
import { SearchSelectComponent } from './search-components/select/select.component';
import { SearchTextComponent } from './search-components/text/text.component';

@NgModule({
  imports: [
    AccessibilityModule,
    CommonModule,
    DateTimePickerModule,
    FocusIfModule,
    FormsModule,
    IconModule,
    PopoverModule,
    SelectModule,
    SearchBuilderComponent,
    SearchBuilderGroupComponent,
    SearchTextComponent,
    SearchDateComponent,
    SearchDateRangeComponent,
    SearchBuilderOutletDirective,
    SearchSelectComponent,
    BaseSearchComponent,
  ],
  exports: [SearchBuilderComponent, SearchBuilderGroupComponent, BaseSearchComponent],
})
export class SearchBuilderModule {}
