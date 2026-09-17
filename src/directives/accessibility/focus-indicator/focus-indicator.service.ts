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

import { FocusMonitor } from '@angular/cdk/a11y';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { ACCESSIBILITY_OPTIONS_TOKEN } from '../options/accessibility-options.token';
import { FocusIndicator } from './focus-indicator';
import { FocusIndicatorOptions } from './focus-indicator-options.interface';
import { FocusIndicatorOriginService } from './focus-indicator-origin/focus-indicator-origin.service';

@Injectable()
export class FocusIndicatorService {
  private readonly _localOptions = inject(ACCESSIBILITY_OPTIONS_TOKEN, { optional: true });

  readonly rendererFactory = inject(RendererFactory2);

  private readonly _focusMonitor = inject(FocusMonitor);

  private readonly _globalOptions = inject(AccessibilityOptionsService);

  private readonly _focusIndicatorOrigin = inject(FocusIndicatorOriginService);

  /** We need the renderer to add and remove classes */
  private readonly _renderer: Renderer2;

  constructor() {
    // programmatically create a renderer as it can't be injected into a service
    this._renderer = this.rendererFactory.createRenderer(null, null);
  }

  /** This is essentially just a factory method to prevent the user having to pass in focus monitor, renderer and global options each time */
  monitor(
    element: HTMLElement,
    options: FocusIndicatorOptions = {
      ...this._globalOptions.options,
      ...this._localOptions,
      checkChildren: false,
    }
  ): FocusIndicator {
    return new FocusIndicator(
      element,
      this._focusMonitor,
      this._renderer,
      { ...this._globalOptions.options, ...this._localOptions, ...options },
      this._focusIndicatorOrigin
    );
  }
}
