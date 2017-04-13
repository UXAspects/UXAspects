import { NgModule } from '@angular/core';

import { ChartsTimelineChartNg1Component } from './timeline-chart-ng1/timeline-chart-ng1.component';

const SECTIONS = [
    ChartsTimelineChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class TimelineChartModule { }
