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

import { Directive, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';

@Directive({ selector: '[uxMenuInitialFocus]' })
export class MenuInitialFocusDirective implements OnInit, OnDestroy {
  private readonly _menu = inject(MenuComponent);

  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly _renderer = inject(Renderer2);

  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.ensureFocusable();

    // Focus the host element when the parent menu is opened.
    this._menu.opened.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this._elementRef.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Apply tabindex="0" to the element if it's not already focusable. */
  private ensureFocusable(): void {
    if (this._elementRef.nativeElement.tabIndex >= 0) {
      return;
    }

    this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
  }
}
