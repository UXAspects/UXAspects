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
            { path: 'bar-charts', loadChildren: './sections/bar-charts/bar-charts.module#BarChartsModule' },
            { path: 'peity-charts', loadChildren: './sections/peity-charts/peity-charts.module#PeityChartsModule' },
            { path: 'donut-charts', loadChildren: './sections/donut-charts/donut-charts.module#DonutChartsModule' },
            { path: 'flot-options', loadChildren: './sections/flot-options/flot-options.module#FlotOptionsModule' },
            { path: 'line-charts', loadChildren: './sections/line-charts/line-charts.module#LineChartsModule' },
            { path: 'live-chart', loadChildren: './sections/live-charts/live-charts.module#LiveChartsModule' },
            { path: 'organization-chart', loadChildren: './sections/organization-chart/organization-chart.module#OrganizationChartModule' },
            { path: 'partition-map', loadChildren: './sections/partition-map/partition-map.module#PartitionMapModule' },
            { path: 'sankey-chart', loadChildren: './sections/sankey-chart/sankey-charts.module#SankeyChartModule' },
            { path: 'scrollable-chart', loadChildren: './sections/scrollable-chart/scrollable-chart.module#ScrollableChartModule' },
            { path: 'social-chart', loadChildren: './sections/social-chart/social-chart.module#SocialChartModule' },
            { path: 'spark-charts', loadChildren: './sections/spark-charts/spark-charts.module#SparkChartsModule' },
            { path: 'timeline-chart', loadChildren: './sections/timeline-chart/timeline-chart.module#TimelineChartModule' }
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
