import { NgModule } from '@angular/core';

import { ChartsBarChartNg1Component } from './bar-chart-ng1/bar-chart-ng1.component';
import { ChartsHorizontalBarChartNg1Component } from './horizontal-bar-chart-ng1/horizontal-bar-chart-ng1.component';
import { ChartsStackedBarChartNg1Component } from './stacked-bar-chart-ng1/stacked-bar-chart-ng1.component';

const SECTIONS = [
    ChartsBarChartNg1Component,
    ChartsHorizontalBarChartNg1Component,
    ChartsStackedBarChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS
})
export class BarChartsModule { }
