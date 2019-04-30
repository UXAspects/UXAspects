import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { OrganizationChartComponent } from './organization-chart.component';

@NgModule({
    declarations: [
        OrganizationChartComponent
    ],
    imports: [
        CommonModule,
        ResizeModule,
        AccessibilityModule
    ],
    exports: [
        OrganizationChartComponent
    ]
})
export class OrganizationChartModule { }
