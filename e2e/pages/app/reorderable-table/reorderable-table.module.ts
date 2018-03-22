import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReorderableModule, SparkModule } from '../../../../dist';
import { ReorderableTableTestPageComponent, MapPipe } from './reorderable-table.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ReorderableModule,
        SparkModule,
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
