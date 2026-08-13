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
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ResizeModule } from '../../directives/resize/index';
import { SafeInnerHtmlDirective } from '../../directives/safe-inner-html/safe-inner-html.directive';
import { ScrollModule } from '../../directives/scroll/index';
import { PopoverOrientationService } from '../../services/popover-orientation/popover-orientation.service';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadOptionsListComponent } from './typeahead-options-list.component';
import { TypeaheadComponent } from './typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ResizeModule,
    ScrollModule,
    SafeInnerHtmlDirective,
    TypeaheadComponent,
    TypeaheadHighlightDirective,
    TypeaheadOptionsListComponent,
  ],
  exports: [TypeaheadComponent],
  providers: [PopoverOrientationService],
})
export class TypeaheadModule {}
