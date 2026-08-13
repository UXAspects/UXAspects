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
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { SafeInnerHtmlDirective } from '../../directives/safe-inner-html/safe-inner-html.directive';
import { IconModule } from '../icon/index';
import { MenuModule } from '../menu/index';
import { TooltipModule } from '../tooltip/index';
import { TypeaheadModule } from '../typeahead/index';
import { FilterContainerComponent } from './filter-container.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FilterDynamicComponent } from './filter-dynamic/filter-dynamic.component';
import { FilterTypeaheadHighlight } from './filter-dynamic/filter-typeahead-highlight.pipe';

const DECLARATIONS = [
  FilterContainerComponent,
  FilterDropdownComponent,
  FilterDynamicComponent,
  FilterTypeaheadHighlight,
];

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    CommonModule,
    FormsModule,
    IconModule,
    MenuModule,
    TooltipModule,
    TypeaheadModule,
    SafeInnerHtmlDirective,
    ...DECLARATIONS,
  ],
  exports: DECLARATIONS,
})
export class FilterModule {}
