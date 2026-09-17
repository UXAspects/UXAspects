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

import { inject, Injectable } from '@angular/core';
import { AccessibilityOptions } from './accessibility-options.interface';
import { ACCESSIBILITY_OPTIONS_TOKEN } from './accessibility-options.token';

@Injectable()
export class AccessibilityOptionsService {
  /** Get the user specified options - but handle cases where they may not be specified */
  readonly _options = inject(ACCESSIBILITY_OPTIONS_TOKEN, { optional: true });

  /** Determine the default options */
  private readonly _defaultOptions: AccessibilityOptions = {
    mouseFocusIndicator: false,
    touchFocusIndicator: false,
    keyboardFocusIndicator: true,
    programmaticFocusIndicator: false,
  };

  /** Get the complete options populating unspecified options with the default values */
  get options(): AccessibilityOptions {
    return { ...this._defaultOptions, ...this._options };
  }
}
