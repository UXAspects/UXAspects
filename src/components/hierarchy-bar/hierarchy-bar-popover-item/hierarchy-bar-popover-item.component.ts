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
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import {
  FocusIndicatorOrigin,
  FocusIndicatorOriginService,
} from '../../../directives/accessibility/index';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
  selector: 'ux-hierarchy-bar-popover-item',
  templateUrl: './hierarchy-bar-popover-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class HierarchyBarPopoverItemComponent implements OnDestroy {
  readonly focusOriginService = inject(FocusIndicatorOriginService);

  readonly elementRef = inject(ElementRef);

  readonly renderer = inject(Renderer2);

  readonly hierarchyBar = inject(HierarchyBarService);

  /** Specify the node to display */
  @Input() node: HierarchyBarNode;

  /**
   * Emit when a click or enter key press occurs.
   * Note this is an `async` EventEmitter to ensure that
   * the event handlers in the `FocusIndicatorOrigin` set
   * the origin before we emit the select event, otherwise
   * the item may not get a focus ring when the keyboard is used.
   */
  @Output() selected = new EventEmitter<HierarchyBarNode>(true);

  /** Allow this to control the focus origin */
  private readonly _focusOrigin: FocusIndicatorOrigin;

  constructor() {
    this._focusOrigin = new FocusIndicatorOrigin(
      this.focusOriginService,
      this.elementRef,
      this.renderer
    );
  }

  ngOnDestroy(): void {
    this._focusOrigin.destroy();
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  onSelect(): void {
    this.selected.emit(this.node);
  }
}
