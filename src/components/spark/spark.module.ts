import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorServiceModule } from '../../services/color/index';
import { TooltipModule } from '../tooltip/index';
import { SparkComponent } from './spark.component';

@NgModule({
  imports: [CommonModule, ColorServiceModule, TooltipModule, SparkComponent],
  exports: [SparkComponent],
})
export class SparkModule {}
