import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers.module';

import { ChartsBarChartsCategoryComponent } from './bar-charts.component';
import { ChartsBarChartNg1Component } from './bar-chart-ng1/bar-chart-ng1.component';
import { ChartsHorizontalBarChartNg1Component } from './horizontal-bar-chart-ng1/horizontal-bar-chart-ng1.component';
import { ChartsStackedBarChartNg1Component } from './stacked-bar-chart-ng1/stacked-bar-chart-ng1.component';

const SECTIONS = [
    ChartsBarChartNg1Component,
    ChartsHorizontalBarChartNg1Component,
    ChartsStackedBarChartNg1Component,
    ChartsBarChartsCategoryComponent
];

const ROUTES = [
    { path: '**', component: ChartsBarChartsCategoryComponent }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        TabsModule,
        WrappersModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class BarChartsModule { }
