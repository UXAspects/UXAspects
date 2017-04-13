import { NgModule } from '@angular/core';

import { ChartsLineChartNg1Component } from './line-chart-ng1/line-chart-ng1.component';
import { ChartsMultipleAxisLineChartNg1Component } from './multiple-axis-line-chart-ng1/multiple-axis-line-chart-ng1.component';
import { ChartsStackedLineChartNg1Component } from './stacked-line-chart-ng1/stacked-line-chart-ng1.component';

const SECTIONS = [
    ChartsLineChartNg1Component,
    ChartsMultipleAxisLineChartNg1Component,
    ChartsStackedLineChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class LineChartsModule { }
