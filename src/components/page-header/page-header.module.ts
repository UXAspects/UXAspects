import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbsModule } from '../breadcrumbs/index';
import { PageHeaderIconMenuComponent } from './icon-menu/icon-menu.component';
import { PageHeaderNavigationComponent } from './navigation/navigation.component';
import { PageHeaderNavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { PageHeaderNavigationDropdownItemComponent } from './navigation/navigation-dropdown-item/navigation-dropdown-item.component';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbsModule,
        BsDropdownModule.forRoot()
    ],
    exports: [ PageHeaderComponent ],
    declarations: [ 
        PageHeaderComponent,
        PageHeaderIconMenuComponent,
        PageHeaderNavigationComponent,
        PageHeaderNavigationItemComponent,
        PageHeaderNavigationDropdownItemComponent
    ]
})
export class PageHeaderModule { }
