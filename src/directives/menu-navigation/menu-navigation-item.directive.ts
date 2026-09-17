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
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { MenuNavigationService } from './menu-navigation.service';

@Directive({ selector: '[uxMenuNavigationItem]' })
export class MenuNavigationItemDirective implements OnDestroy {
  readonly focusIndicatorService = inject(FocusIndicatorService);

  private readonly _elementRef = inject(ElementRef);

  private readonly _menuNavigationService = inject(MenuNavigationService);

  /** Emit when this menu is activated */
  @Output() activated = new EventEmitter<void>();

  /** Unsubscribe from all observables on destroy */
  private readonly _onDestroy = new Subject<void>();

  /** Keep a reference to the focus indicator */
  private readonly _focusIndicator: FocusIndicator;

  constructor() {
    // register this item with the menu - this allows for nested menus as we each uxMenuNavigation will create its own service
    this._menuNavigationService.register(this);

    // create the focus indicator
    this._focusIndicator = this.focusIndicatorService.monitor(this._elementRef.nativeElement, {
      programmaticFocusIndicator: true,
      checkChildren: false,
    });

    /** Subscribe to the current active index */
    this._menuNavigationService.active$
      .pipe(
        takeUntil(this._onDestroy),
        filter(item => item === this)
      )
      .subscribe(() => this.setActive());
  }

  ngOnDestroy(): void {
    this._menuNavigationService.unregister(this);
    this._onDestroy.unsubscribe();
    this._focusIndicator.destroy();
  }

  setActive(): void {
    this._elementRef.nativeElement.focus();
    this.activated.emit();
  }
}
