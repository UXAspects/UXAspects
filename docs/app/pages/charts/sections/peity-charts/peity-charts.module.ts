import { NgModule } from '@angular/core';

import { ChartsPeityChartNg1Component } from './peity-charts-ng1/peity-charts-ng1.component';

const SECTIONS = [
    ChartsPeityChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class PeityChartsModule { }
