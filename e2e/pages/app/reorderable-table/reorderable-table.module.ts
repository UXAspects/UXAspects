import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, ReorderableModule, SparkModule } from '@ux-aspects/ux-aspects';
import { MapPipe, ReorderableTableTestPageComponent } from './reorderable-table.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ReorderableModule,
        SparkModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReorderableTableTestPageComponent
            }
        ])
    ],
    declarations: [
        MapPipe,
        ReorderableTableTestPageComponent
    ]
})
export class ReorderableTableTestPageModule { }
