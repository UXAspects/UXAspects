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

import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

@Directive({ selector: '[uxClickOutside]' })
export class ClickOutsideDirective {
  private readonly _elementRef = inject(ElementRef);

  @Output() uxClickOutside = new EventEmitter<MouseEvent>();

  /** Often a click event makes the element appear - if so we can end up closing it immediately */
  private _initialised: boolean = false;

  constructor() {
    setTimeout(() => (this._initialised = true));
  }

  @HostListener('document:click', ['$event'])
  click(event: MouseEvent): void {
    if (
      this._initialised &&
      this._elementRef.nativeElement !== event.target &&
      !this._elementRef.nativeElement.contains(event.target)
    ) {
      this.uxClickOutside.emit(event);
    }
  }
}
