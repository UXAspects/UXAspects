import 'chart.js';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';
import { ChartsPageComponent } from './charts.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ChartsPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'bar-charts' },
            { path: 'bar-charts', loadChildren: './sections/bar-charts/bar-charts.module#ChartsBarChartsModule' },
            { path: 'peity-charts', loadChildren: './sections/peity-charts/peity-charts.module#ChartsPeityChartsModule' },
            { path: 'donut-charts', loadChildren: './sections/donut-charts/donut-charts.module#ChartsDonutChartsModule' },
            { path: 'flot-options', loadChildren: './sections/flot-options/flot-options.module#ChartsFlotOptionsModule' },
            { path: 'line-charts', loadChildren: './sections/line-charts/line-charts.module#ChartsLineChartsModule' },
            { path: 'live-chart', loadChildren: './sections/live-charts/live-charts.module#ChartsLiveChartsModule' },
            { path: 'organization-chart', loadChildren: './sections/organization-chart/organization-chart.module#ChartsOrganizationChartModule' },
            { path: 'partition-map', loadChildren: './sections/partition-map/partition-map.module#ChartsPartitionMapModule' },
            { path: 'sankey-chart', loadChildren: './sections/sankey-chart/sankey-charts.module#ChartsSankeyChartModule' },
            { path: 'scrollable-chart', loadChildren: './sections/scrollable-chart/scrollable-chart.module#ChartsScrollableChartModule' },
            { path: 'social-chart', loadChildren: './sections/social-chart/social-chart.module#ChartsSocialChartModule' },
            { path: 'spark-charts', loadChildren: './sections/spark-charts/spark-charts.module#ChartsSparkChartsModule' },
            { path: 'timeline-chart', loadChildren: './sections/timeline-chart/timeline-chart.module#ChartsTimelineChartModule' }
        ],
    },
    {
        path: '**',
        redirectTo: '/bar-charts'
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [ChartsPageComponent],
    declarations: [ChartsPageComponent]
})
export class ChartsPageModule {

}
