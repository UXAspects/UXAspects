import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule, FilterModule, IconModule, MenuModule, SparkModule } from '@ux-aspects/ux-aspects';
import { FiltersCloseOnBlurTestPageComponent } from './closeOnBlur/filters-closeonblur.testpage.component';
import { FiltersTestPageComponent } from './filters.testpage.component';


const ROUTES = [
    {
        path: '',
        component: FiltersTestPageComponent,
    },
    {
        path: 'close-on-blur',
        component: FiltersCloseOnBlurTestPageComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        SparkModule,
        FilterModule,
        AccessibilityModule,
        IconModule,
        CheckboxModule,
        MenuModule.forChild({ animate: false }),
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        FiltersTestPageComponent,
        FiltersCloseOnBlurTestPageComponent
    ]
})
export class FiltersTestPageModule { }
