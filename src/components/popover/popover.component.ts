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

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';
import { TooltipComponent } from '../tooltip/index';

let uniquePopoverId = 0;

@Component({
  selector: 'ux-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, ClickOutsideDirective, NgTemplateOutlet],
})
export class PopoverComponent extends TooltipComponent {
  /** Define a unique id for each popover */
  id: string = `ux-popover-${++uniquePopoverId}`;

  /** If specified allows the popover to show a title */
  title: string;

  /** This will emit an event any time the user clicks outside the popover */
  clickOutside$ = new Subject<MouseEvent>();

  constructor() {
    super();
  }

  /** This will update the title of the popover and trigger change detection */
  setTitle(title: string): void {
    this.title = title;
    this._changeDetectorRef.markForCheck();
  }
}
