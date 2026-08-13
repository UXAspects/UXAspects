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
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FocusIndicatorOriginDirective } from '../../../directives/accessibility/focus-indicator/focus-indicator-origin/focus-indicator-origin.directive';
import { FocusIndicatorDirective } from '../../../directives/accessibility/focus-indicator/focus-indicator.directive';
import { IconComponent } from '../../icon/icon.component';
import { PopoverDirective } from '../../popover/popover.directive';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
  selector: 'ux-hierarchy-bar-node',
  templateUrl: './hierarchy-bar-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.visibility]': 'visible ? "visible" : "hidden"',
  },
  imports: [
    FocusIndicatorDirective,
    FocusIndicatorOriginDirective,
    PopoverDirective,
    NgTemplateOutlet,
    IconComponent,
  ],
})
export class HierarchyBarNodeComponent {
  readonly hierarchyBar = inject(HierarchyBarService);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Specify the node data */
  @Input() node: HierarchyBarNode;

  /** Define the template for the popover */
  @Input() popoverTemplate: TemplateRef<void>;

  /** Determine the mode of the hierarchy bar */
  @Input() mode: string;

  /** Determine read only state */
  @Input() readonly: boolean;

  /** Optionally define the horizontal offset */
  @Input() offset: number = 0;

  /** Emit when the node is selected */
  @Output() selected = new EventEmitter<HierarchyBarNode>();

  /** Determine if this node should be hidden due to overflow */
  visible: boolean = true;

  /** Get the width of the element */
  get width(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }
}
