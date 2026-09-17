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

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';

@Injectable()
export class MenuNavigationService {
  /** Store a list of items that belong to this menu */
  menuItems: ReadonlyArray<MenuNavigationItemDirective> = [];

  /** Store the current active menu item */
  active$ = new BehaviorSubject<MenuNavigationItemDirective>(null);

  /** Add an item to this menu */
  register(menuItem: MenuNavigationItemDirective): void {
    this.menuItems = [...this.menuItems, menuItem];
  }

  /** Remove an item from the list of menu items */
  unregister(menuItem: MenuNavigationItemDirective): void {
    this.menuItems = this.menuItems.filter(_menuItem => _menuItem !== menuItem);
  }
}
