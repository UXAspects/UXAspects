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

import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[uxAutoGrow]' })
export class AutoGrowDirective implements AfterViewInit {
  private readonly _elementRef = inject(ElementRef);

  private readonly _renderer = inject(Renderer2);

  constructor() {
    // ensure this is a textarea or else throw error
    if (this._elementRef.nativeElement.tagName.toLowerCase() !== 'textarea') {
      throw new Error('uxAutoGrow directive can only be used on <textarea> elements.');
    }
  }

  ngAfterViewInit(): void {
    this.update();
  }

  @HostListener('input')
  update(): void {
    // perform sizing
    this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'hidden');
    this._renderer.setStyle(this._elementRef.nativeElement, 'height', 'auto');

    // get the new total height and element height
    const { scrollHeight } = this._elementRef.nativeElement;
    const { maxHeight } = getComputedStyle(this._elementRef.nativeElement);

    // determine what the maximum allowed height is
    const maximum = !isNaN(parseFloat(maxHeight)) ? parseFloat(maxHeight) : Infinity;

    // if there is a max height specifed we want to show the scrollbars
    if (maximum < scrollHeight) {
      this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'auto');
      this._renderer.setStyle(this._elementRef.nativeElement, 'height', maximum + 'px');
    } else {
      this._renderer.setStyle(this._elementRef.nativeElement, 'height', scrollHeight + 'px');
    }
  }
}
