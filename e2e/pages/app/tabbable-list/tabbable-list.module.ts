import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { SimpleTabbableListComponent } from './simple-list/simple-tabbable-list.component';

@NgModule({
    imports: [
        CommonModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: 'simple-list',
                component: SimpleTabbableListComponent
            }
        ])
    ],
    declarations: [SimpleTabbableListComponent]
})
export class TabbableListTestPageModule { }
