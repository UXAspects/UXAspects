import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReorderableModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ReorderableGroupTestPageComponent } from './reorderable-group.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ReorderableModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReorderableGroupTestPageComponent
            }
        ])
    ],
    declarations: [
        ReorderableGroupTestPageComponent
    ]
})
export class ReorderableGroupTestPageModule { }
