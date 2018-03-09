import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparkComponent } from './spark.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ColorServiceModule } from '../../services/color/index';

@NgModule({
    imports: [
        CommonModule,
        ColorServiceModule,
        TooltipModule.forRoot()
    ],
    exports: [SparkComponent],
    declarations: [SparkComponent]
})
export class SparkModule { }
