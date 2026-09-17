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

import { Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { FocusIndicatorOrigin } from './focus-indicator-origin';
import { FocusIndicatorOriginService } from './focus-indicator-origin.service';

@Directive({ selector: '[uxFocusIndicatorOrigin]' })
export class FocusIndicatorOriginDirective implements OnDestroy {
  readonly focusOriginService = inject(FocusIndicatorOriginService);

  readonly elementRef = inject(ElementRef);

  readonly renderer = inject(Renderer2);

  /** Store the instance of the focus indicator origin */
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
}
