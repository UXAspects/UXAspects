import { NgModule } from '@angular/core';

import { ChartsSankeyChartNg1Component } from './sankey-chart-ng1/sankey-chart-ng1.component';

const SECTIONS = [
    ChartsSankeyChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class SankeyChartModule { }
