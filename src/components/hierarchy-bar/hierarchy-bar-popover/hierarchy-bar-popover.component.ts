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

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FocusIndicatorDirective } from '../../../directives/accessibility/focus-indicator/focus-indicator.directive';
import { TabbableListItemDirective } from '../../../directives/accessibility/tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from '../../../directives/accessibility/tabbable-list/tabbable-list.directive';
import { FocusIfDirective } from '../../../directives/focus-if/focus-if.directive';
import { HierarchyBarPopoverItemComponent } from '../hierarchy-bar-popover-item/hierarchy-bar-popover-item.component';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
  selector: 'ux-hierarchy-bar-popover',
  templateUrl: './hierarchy-bar-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    TabbableListDirective,
    HierarchyBarPopoverItemComponent,
    FocusIndicatorDirective,
    TabbableListItemDirective,
    FocusIfDirective,
  ],
})
export class HierarchyBarPopoverComponent {
  readonly hierarchyBar = inject(HierarchyBarService);

  /** Define the nodes to display */
  @Input() nodes: HierarchyBarNode[] = [];

  /** Define the loading state */
  @Input() loading: boolean;

  /** Defines if dropdown items should have separators between them to distinguish if nodes are siblings or ancestors */
  @Input() separator: boolean = false;

  /** Emit a select event when an item ahs been clicked or enter key pressed */
  @Output() selected = new EventEmitter<HierarchyBarNode>();
}
