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

import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, inject, Input } from '@angular/core';
import { IconComponent } from '../../../icon/icon.component';
import { MenuItemComponent } from '../../../menu/menu-item/menu-item.component';
import { MenuTriggerDirective } from '../../../menu/menu-trigger/menu-trigger.directive';
import { MenuComponent } from '../../../menu/menu/menu.component';
import { PageHeaderService } from '../../page-header.service';
import type { PageHeaderNavigationDropdownItem } from '../navigation.component';

@Component({
  selector: 'ux-page-header-horizontal-navigation-dropdown-item',
  exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
  templateUrl: './navigation-dropdown-item.component.html',
  imports: [MenuItemComponent, MenuTriggerDirective, IconComponent, MenuComponent],
})
export class PageHeaderNavigationDropdownItemComponent {
  private readonly _pageHeaderService = inject(PageHeaderService);

  /** Access the data for this item */
  @Input() item: PageHeaderNavigationDropdownItem;

  select(item: PageHeaderNavigationDropdownItem): void {
    // clicking on an item that is disabled or with children then return
    if (item.disabled || item.children) {
      return;
    }

    // emit the selected item in an event
    this._pageHeaderService.select(item);
  }

  keydownHandler(event: KeyboardEvent, item: PageHeaderNavigationDropdownItem): void {
    switch (event.keyCode) {
      case ENTER:
      case SPACE:
        this.select(item);
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }
}
