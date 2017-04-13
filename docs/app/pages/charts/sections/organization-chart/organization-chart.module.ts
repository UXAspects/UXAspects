import { NgModule } from '@angular/core';

import { ChartsOrganizationChartNg1Component } from './organization-chart-ng1/organization-chart-ng1.component';

const SECTIONS = [
    ChartsOrganizationChartNg1Component
];

@NgModule({
    imports: [],
    exports: SECTIONS,
    declarations: SECTIONS,
    providers: [],
})
export class OrganizationChartModule { }
