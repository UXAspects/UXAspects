import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterModule, IconModule, MenuModule, SparkModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { FiltersTestPageComponent } from './filters.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        SparkModule,
        FilterModule,
        AccessibilityModule,
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
