import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AccessibilityModule,
  CheckboxModule,
  FilterModule,
  IconModule,
  MenuModule,
  SparkModule,
} from '@ux-aspects/ux-aspects';
import { FiltersTestPageComponent } from './filters.testpage.component';

@NgModule({
  imports: [
    CommonModule,
    SparkModule,
    FilterModule,
    AccessibilityModule,
    IconModule,
    CheckboxModule,
    MenuModule.forChild({ animate: false }),
    RouterModule.forChild([
      {
        path: '',
        component: FiltersTestPageComponent,
      },
    ]),
  ],
  declarations: [FiltersTestPageComponent],
})
export class FiltersTestPageModule {}
