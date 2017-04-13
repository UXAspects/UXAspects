import { NgModule } from '@angular/core';

import { ChartsDonutChartNg1Component } from './donut-chart-ng1/donut-chart-ng1.component';
import { ChartsNestedDonutChartNg1Component } from './nested-donut-chart-ng1/nested-donut-chart-ng1.component';

const SECTIONS = [
    ChartsDonutChartNg1Component,
    ChartsNestedDonutChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class DonutChartsModule { }
