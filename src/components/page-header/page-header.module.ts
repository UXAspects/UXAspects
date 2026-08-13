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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { BreadcrumbsModule } from '../breadcrumbs/index';
import { IconModule } from '../icon/index';
import { MenuModule } from '../menu/index';
import { TabsetModule } from '../tabset/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderIconMenuComponent } from './icon-menu/icon-menu.component';
import { PageHeaderNavigationDropdownItemComponent } from './navigation/navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { PageHeaderNavigationSecondaryItemDirective } from './navigation/navigation-secondary-item/navigation-secondary-item.directive';
import { PageHeaderNavigationComponent } from './navigation/navigation.component';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    BreadcrumbsModule,
    ColorServiceModule,
    CommonModule,
    IconModule,
    MenuModule,
    ResizeModule,
    TabsetModule,
    RouterModule,
    PageHeaderComponent,
    PageHeaderIconMenuComponent,
    PageHeaderCustomMenuDirective,
    PageHeaderNavigationComponent,
    PageHeaderNavigationItemComponent,
    PageHeaderNavigationDropdownItemComponent,
    PageHeaderNavigationSecondaryItemDirective,
  ],
  exports: [PageHeaderComponent, PageHeaderCustomMenuDirective],
})
export class PageHeaderModule {}
