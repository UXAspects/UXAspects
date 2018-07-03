import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MenuNavigationModule } from '../../directives/menu-navigation/index';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { BreadcrumbsModule } from '../breadcrumbs/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderIconMenuComponent } from './icon-menu/icon-menu.component';
import { PageHeaderNavigationDropdownItemComponent } from './navigation/navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { PageHeaderNavigationSecondaryItemDirective } from './navigation/navigation-secondary-item/navigation-secondary-item.directive';
import { PageHeaderNavigationComponent } from './navigation/navigation.component';
import { PageHeaderComponent } from './page-header.component';


@NgModule({
    imports: [
        CommonModule,
        BreadcrumbsModule,
        ColorServiceModule,
        ResizeModule,
        MenuNavigationModule,
        BsDropdownModule.forRoot()
    ],
    exports: [
        PageHeaderComponent,
        PageHeaderCustomMenuDirective
    ],
    declarations: [
        PageHeaderComponent,
        PageHeaderIconMenuComponent,
        PageHeaderCustomMenuDirective,
        PageHeaderNavigationComponent,
        PageHeaderNavigationItemComponent,
        PageHeaderNavigationDropdownItemComponent,
        PageHeaderNavigationSecondaryItemDirective
    ]
})
export class PageHeaderModule { }
