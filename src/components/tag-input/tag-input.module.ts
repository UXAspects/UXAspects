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
import { IconModule } from '../icon/index';
import { TypeaheadModule } from '../typeahead/index';
import { TagInputComponent } from './tag-input.component';

@NgModule({
  imports: [
    AccessibilityModule,
    CommonModule,
    FormsModule,
    FocusIfModule,
    IconModule,
    TypeaheadModule,
    TagInputComponent,
  ],
  exports: [TagInputComponent],
})
export class TagInputModule {}
