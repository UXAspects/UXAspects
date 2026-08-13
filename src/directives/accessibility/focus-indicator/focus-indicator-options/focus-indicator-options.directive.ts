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

import { Directive, inject, Input } from '@angular/core';
import { AccessibilityOptions } from '../../options/accessibility-options.interface';
import { LocalFocusIndicatorOptions } from './focus-indicator-options';

@Directive({
  selector: '[uxFocusIndicatorOptions]',
  providers: [LocalFocusIndicatorOptions],
})
export class FocusIndicatorOptionsDirective implements AccessibilityOptions {
  private readonly _options = inject(LocalFocusIndicatorOptions, { self: true });

  /** If `true`, this element will receive a focus indicator when the element is clicked on. */
  @Input() set mouseFocusIndicator(mouseFocusIndicator: boolean) {
    this._options.mouseFocusIndicator = mouseFocusIndicator;
  }

  /** If `true`, this element will receive a focus indicator when the element is touched. */
  @Input() set touchFocusIndicator(touchFocusIndicator: boolean) {
    this._options.touchFocusIndicator = touchFocusIndicator;
  }

  /** If `true`, this element will receive a focus indicator when the element is focused using the keyboard. */
  @Input() set keyboardFocusIndicator(keyboardFocusIndicator: boolean) {
    this._options.keyboardFocusIndicator = keyboardFocusIndicator;
  }

  /** If `true`, this element will receive a focus indicator when the element is programmatically focused. */
  @Input() set programmaticFocusIndicator(programmaticFocusIndicator: boolean) {
    this._options.programmaticFocusIndicator = programmaticFocusIndicator;
  }
}
