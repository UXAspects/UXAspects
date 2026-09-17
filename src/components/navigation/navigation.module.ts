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

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLinkDirective } from './navigation-link/navigation-link.directive';
import { NAVIGATION_MODULE_OPTIONS, NavigationModuleOptions } from './navigation-options';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    AccessibilityModule,
    CommonModule,
    IconModule,
    RouterModule,
    NavigationComponent,
    NavigationItemComponent,
    NavigationLinkDirective,
  ],
  exports: [NavigationComponent, NavigationItemComponent],
})
export class NavigationModule {
  // allow options to be specified globally
  static forRoot(options: NavigationModuleOptions): ModuleWithProviders<NavigationModule> {
    return {
      ngModule: NavigationModule,
      providers: [{ provide: NAVIGATION_MODULE_OPTIONS, useValue: options }],
    };
  }
}
