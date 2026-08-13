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

import { Directive, ElementRef, EventEmitter, inject, OnDestroy, Output } from '@angular/core';

@Directive({ selector: '[uxFocusWithin],[uxBlurWithin]' })
export class FocusWithinDirective implements OnDestroy {
  private readonly _elementRef = inject(ElementRef);

  /** Emits when a child element gains focus */
  @Output() uxFocusWithin = new EventEmitter<void>();

  /** Emits when a child element loses focus */
  @Output() uxBlurWithin = new EventEmitter<void>();

  /**
   * Note: We used to use @angular/cdk FocusMonitor here instead of manually listening
   * to focus blur events, however this was problematic as any child elements using the FocusMonitor,
   * eg: `uxFocusIndicator` which not get the correct `origin`, they will instead get a programmatic
   * origin even if it was clicked or focused via the keyboard.
   */
  constructor() {
    // We need to listen in capture phase since focus events don't bubble.
    this._elementRef.nativeElement.addEventListener('focus', this.onFocus.bind(this), true);
    this._elementRef.nativeElement.addEventListener('blur', this.onBlur.bind(this), true);
  }

  ngOnDestroy(): void {
    this._elementRef.nativeElement.removeEventListener('focus', this.onFocus.bind(this), true);
    this._elementRef.nativeElement.removeEventListener('blur', this.onBlur.bind(this), true);
  }

  private onFocus(): void {
    this.uxFocusWithin.emit();
  }

  private onBlur(): void {
    this.uxBlurWithin.emit();
  }
}
