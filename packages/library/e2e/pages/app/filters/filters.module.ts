import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterModule, SparkModule } from '../../../../dist';

import { FiltersTestPageComponent } from './filters.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        SparkModule,
        FilterModule,
        RouterModule.forChild([
            {
                path: '',
                component: FiltersTestPageComponent
            }
        ])
    ],
    declarations: [FiltersTestPageComponent]
})
export class FiltersTestPageModule { }
