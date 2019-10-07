import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReorderableModule, SparkModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ReorderableTableTestPageComponent, MapPipe } from './reorderable-table.testpage.component';

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
