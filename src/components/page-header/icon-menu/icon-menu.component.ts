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
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getIconType } from '../../../common/index';
import { IconComponent } from '../../icon/icon.component';
import { MenuDividerComponent } from '../../menu/menu-divider/menu-divider.component';
import { MenuItemComponent } from '../../menu/menu-item/menu-item.component';
import { MenuTriggerDirective } from '../../menu/menu-trigger/menu-trigger.directive';
import { MenuComponent } from '../../menu/menu/menu.component';
import { PageHeaderIconMenu, PageHeaderIconMenuDropdownItem } from '../interfaces';

@Component({
  selector: 'ux-page-header-icon-menu',
  templateUrl: './icon-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenuTriggerDirective,
    NgClass,
    IconComponent,
    MenuComponent,
    MenuItemComponent,
    MenuDividerComponent,
  ],
})
export class PageHeaderIconMenuComponent {
  /** Get the data for this icon menu */
  @Input() menu: PageHeaderIconMenu;

  select(item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem): void {
    if (item.select) {
      item.select.call(item, item);
    }
  }

  keydownHandler(
    item: PageHeaderIconMenu | PageHeaderIconMenuDropdownItem,
    event: KeyboardEvent
  ): void {
    switch (event.keyCode) {
      case ENTER:
      case SPACE:
        this.select(item);
        event.preventDefault();
        event.stopPropagation();
        break;
    }
  }

  _getIconType(identifier: string): string {
    return identifier ? getIconType(identifier) : '';
  }
}
