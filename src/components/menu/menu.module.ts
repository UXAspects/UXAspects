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

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { MenuDividerComponent } from './menu-divider/menu-divider.component';
import { MenuInitialFocusDirective } from './menu-initial-focus/menu-initial-focus.directive';
import { MenuItemCustomControlDirective } from './menu-item-custom-control/menu-item-custom-control.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuModuleOptions } from './menu-options.interface';
import { MENU_OPTIONS_TOKEN } from './menu-options.token';
import { MenuTabbableItemDirective } from './menu-tabbable-item/menu-tabbable-item.directive';
import { MenuTriggerDirective } from './menu-trigger/menu-trigger.directive';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    CommonModule,
    OverlayModule,
    MenuComponent,
    MenuTriggerDirective,
    MenuItemComponent,
    MenuDividerComponent,
    MenuTabbableItemDirective,
    MenuInitialFocusDirective,
    MenuItemCustomControlDirective,
  ],
  exports: [
    MenuComponent,
    MenuTriggerDirective,
    MenuItemComponent,
    MenuDividerComponent,
    MenuTabbableItemDirective,
    MenuInitialFocusDirective,
    MenuItemCustomControlDirective,
  ],
})
export class MenuModule {
  static forRoot(options: MenuModuleOptions): ModuleWithProviders<MenuModule> {
    return {
      ngModule: MenuModule,
      providers: [{ provide: MENU_OPTIONS_TOKEN, useValue: options }],
    };
  }

  /** Support options at a child module level (implementation is the same as `forRoot`) */
  static forChild(options: MenuModuleOptions): ModuleWithProviders<MenuModule> {
    return MenuModule.forRoot(options);
  }
}
