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

import { Directive, ElementRef, inject, Input, OnDestroy } from '@angular/core';

@Directive({ selector: '[focusIf]' })
export class FocusIfDirective implements OnDestroy {
  private readonly _elementRef = inject(ElementRef);

  /** The delay that should ellapse before focussing the element */
  @Input() focusIfDelay: number = 0;

  /** Determine if we should scroll the element into view when focused */
  @Input() focusIfScroll: boolean = true;

  /** Focus when the boolean value is true */
  @Input()
  set focusIf(focus: boolean) {
    // if a timeout is pending then cancel it
    if (!focus && this._timeout !== null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    if (focus && this._timeout === null) {
      this._timeout = window.setTimeout(() => {
        this._elementRef.nativeElement.focus({ preventScroll: !this.focusIfScroll });
        this._timeout = null;
      }, this.focusIfDelay);
    }
  }

  private _timeout: number = null;

  ngOnDestroy(): void {
    if (this._timeout !== null) {
      clearTimeout(this._timeout);
    }
  }
}
