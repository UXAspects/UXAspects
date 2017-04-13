import { NgModule } from '@angular/core';

import { ChartsLiveChartNg1Component } from './live-chart-ng1/live-chart-ng1.component';

const SECTIONS = [
    ChartsLiveChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class LiveChartsModule { }
