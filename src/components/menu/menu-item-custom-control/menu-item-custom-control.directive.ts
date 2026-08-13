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

import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Directive, inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FocusableControl } from '../interfaces/focusable-control.interface';
import { MenuItemType } from '../menu-item/menu-item-type.enum';
import { MenuTabbableItemDirective } from '../menu-tabbable-item/menu-tabbable-item.directive';

export const FocusableItemToken = new InjectionToken<FocusableControl>('Focusable Option');

@Directive({
  selector: '[uxMenuItemCustomControl]',
  host: {
    '[class.ux-menu-item]': 'true',
    role: 'menuitem',
  },
})
export class MenuItemCustomControlDirective
  extends MenuTabbableItemDirective
  implements FocusableOption, OnInit, OnDestroy
{
  private readonly _focusableControl = inject(FocusableItemToken, { optional: true });

  /** Indicate the type of the menu item */
  readonly type: MenuItemType = MenuItemType.Custom;

  constructor() {
    super();
  }

  ngOnInit(): void {
    // register this item in the MenuComponent
    super.ngOnInit();

    this._menu.opened.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
      // remove any existing tab index on component instance and have it handled by this directive
      this._focusableControl?.setInputTabIndex(-1);
    });
  }

  /** Focus this item with a given origin */
  focus(origin: FocusOrigin): void {
    super.focus(origin);
    this._focusableControl
      ? this._focusableControl.focus(origin)
      : this._elementRef.nativeElement.focus();
  }

  /** We want to remove the ability to shift+tab back into the parent element */
  protected setTabIndex(): void {
    super.setTabIndex(false);
  }
}
