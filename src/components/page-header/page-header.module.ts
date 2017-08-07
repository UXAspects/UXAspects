import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbsModule } from '../breadcrumbs/index';
import { PageHeaderIconMenuComponent } from './icon-menu/icon-menu.component';
import { PageHeaderNavigationComponent } from './navigation/navigation.component';
import { PageHeaderNavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { PageHeaderNavigationDropdownItemComponent } from './navigation/navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { ResizeModule } from '../../directives/resize/index';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbsModule,
        ResizeModule,
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
        PageHeaderNavigationDropdownItemComponent
    ]
})
export class PageHeaderModule { }
