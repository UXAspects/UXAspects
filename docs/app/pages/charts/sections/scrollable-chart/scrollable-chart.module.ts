import { NgModule } from '@angular/core';

import { ChartsScrollableChartNg1Component } from './scrollable-chart-ng1/scrollable-chart-ng1.component';

const SECTIONS = [
    ChartsScrollableChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class ScrollableChartModule { }
