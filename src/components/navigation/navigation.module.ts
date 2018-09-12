import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLinkDirective } from './navigation-link/navigation-link.directive';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        NavigationComponent,
        NavigationItemComponent
    ],
    declarations: [
        NavigationComponent,
        NavigationItemComponent,
        NavigationLinkDirective
    ]
})
export class NavigationModule { }
