import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, ReorderableModule, SparkModule } from '@ux-aspects/ux-aspects';
import { MapPipe, ReorderableTableTestPageComponent } from './reorderable-table.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
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
