import { NgModule } from '@angular/core';

import { ChartsSocialChartNg1Component } from './social-chart-ng1/social-chart-ng1.component';

const SECTIONS = [
    ChartsSocialChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class SocialChartModule { }
