import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterModule, IconModule, MenuModule, SparkModule } from '@ux-aspects/ux-aspects';
import { FiltersTestPageComponent } from './filters.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        SparkModule,
        FilterModule,
        IconModule,
        MenuModule.forChild({ animate: false }),
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
