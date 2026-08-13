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

import { Directive, HostListener, inject } from '@angular/core';
import { isKeyboardTrigger } from '../../common/index';
import { FocusIndicatorOriginService } from '../../directives/accessibility/index';
import { SidePanelService } from './side-panel.service';

@Directive({ selector: '[uxSidePanelClose]' })
export class SidePanelCloseDirective {
  private readonly _service = inject(SidePanelService);

  private readonly _focusOrigin = inject(FocusIndicatorOriginService);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent | KeyboardEvent): void {
    // determine the correct origin for the trigger event
    this._focusOrigin.setOrigin(isKeyboardTrigger(event) ? 'keyboard' : 'mouse');

    // close the side panel menu
    this._service.close();
  }
}
