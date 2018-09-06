import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { AccessibilityModule } from '../../directives/accessibility/index';

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
        NavigationItemComponent
    ]
})
export class NavigationModule { }
