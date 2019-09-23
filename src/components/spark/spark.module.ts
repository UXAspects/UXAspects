import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparkComponent } from './spark.component';
import { ColorServiceModule } from '../../services/color/index';
import { TooltipModule } from '../tooltip/index';

@NgModule({
    imports: [
        CommonModule,
        ColorServiceModule,
        TooltipModule
    ],
    exports: [SparkComponent],
    declarations: [SparkComponent]
})
export class SparkModule { }
