import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReorderableModule, SparkModule } from '../../../../dist';
import { ReorderableGroupTestPageComponent } from './reorderable-group.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ReorderableModule,
        SparkModule,
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
