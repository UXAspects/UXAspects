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

import { Directive } from '@angular/core';
import { FocusIndicatorDirective } from './focus-indicator.directive';

/**
 * This directive can be used to target specific elements based on their CSS
 * class so we can control when the focus shows. This will help prevent us
 * polluting the FocusIndicatorDirective with an lot of selectors.
 *
 * If the button has a uxFocusIndicator, uxMenuTriggerFor or uxMenuNavigationToggle directive applied we should skip this
 */
@Directive({
  selector:
    '.btn:not([uxFocusIndicator]):not([uxMenuNavigationToggle]):not([uxMenuTriggerFor]), a[href]:not([uxFocusIndicator]):not([uxMenuNavigationToggle]):not([uxMenuTriggerFor])',
})
export class DefaultFocusIndicatorDirective extends FocusIndicatorDirective {
  constructor() {
    super();

    // Enable programmatic focus by default
    this.programmaticFocusIndicator = true;
  }
}
