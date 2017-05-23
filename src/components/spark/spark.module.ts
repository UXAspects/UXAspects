import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparkComponent } from './spark.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule.forRoot()
    ],
    exports: [SparkComponent],
    declarations: [SparkComponent]
})
export class SparkModule { }
