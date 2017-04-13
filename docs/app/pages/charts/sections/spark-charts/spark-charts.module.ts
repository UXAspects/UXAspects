import { NgModule } from '@angular/core';

import { ChartsSparkChartNg1Component } from './spark-chart-ng1/spark-chart-ng1.component';

const SECTIONS = [
    ChartsSparkChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class SparkChartsModule { }
