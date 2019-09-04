import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { IconModule } from '../icon/index';
import { OrganizationChartComponent } from './organization-chart.component';

@NgModule({
    declarations: [
        OrganizationChartComponent
    ],
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule,
        ResizeModule,
    ],
    exports: [
        OrganizationChartComponent
    ]
})
export class OrganizationChartModule { }
