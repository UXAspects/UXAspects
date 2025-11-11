import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { ResizeModule } from '../../directives/resize/index';
import { IconModule } from '../icon/index';
import { OrganizationChartComponent } from './organization-chart.component';

@NgModule({
  imports: [
    AccessibilityModule,
    CommonModule,
    IconModule,
    ResizeModule,
    OrganizationChartComponent,
  ],
  exports: [OrganizationChartComponent],
})
export class OrganizationChartModule {}
