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
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { ResizeModule } from '../../directives/resize/index';
import { IconModule } from '../icon/index';
import { PopoverModule } from '../popover/index';
import { HierarchyBarCollapsedComponent } from './hierarchy-bar-collapsed/hierarchy-bar-collapsed.component';
import { HierarchyBarNodeIconDirective } from './hierarchy-bar-node/hierarchy-bar-node-icon.directive';
import { HierarchyBarNodeComponent } from './hierarchy-bar-node/hierarchy-bar-node.component';
import { HierarchyBarPopoverItemComponent } from './hierarchy-bar-popover-item/hierarchy-bar-popover-item.component';
import { HierarchyBarPopoverComponent } from './hierarchy-bar-popover/hierarchy-bar-popover.component';
import { HierarchyBarStandardComponent } from './hierarchy-bar-standard/hierarchy-bar-standard.component';
import { HierarchyBarComponent } from './hierarchy-bar.component';

@NgModule({
  imports: [
    AccessibilityModule,
    CommonModule,
    FocusIfModule,
    IconModule,
    PopoverModule,
    ResizeModule,
    HierarchyBarComponent,
    HierarchyBarStandardComponent,
    HierarchyBarCollapsedComponent,
    HierarchyBarNodeComponent,
    HierarchyBarPopoverComponent,
    HierarchyBarPopoverItemComponent,
    HierarchyBarNodeIconDirective,
  ],
  exports: [
    HierarchyBarComponent,
    HierarchyBarStandardComponent,
    HierarchyBarCollapsedComponent,
    HierarchyBarNodeIconDirective,
  ],
})
export class HierarchyBarModule {}
