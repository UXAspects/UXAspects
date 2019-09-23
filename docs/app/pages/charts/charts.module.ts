import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsetModule } from '@ux-aspects/ux-aspects';
import 'chart.js';
import { DocumentationComponentsModule } from '../../components/components.module';
import { ChartsPageComponent } from './charts.component';


const ROUTES: Routes = [
    {
        path: '',
        component: ChartsPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'bar-charts' },
            { path: 'bar-charts', loadChildren: () => import('./charts-sections/bar-charts/bar-charts.module').then(m => m.ChartsBarChartsModule) },
            { path: 'peity-charts', loadChildren: () => import('./charts-sections/peity-charts/peity-charts.module').then(m => m.ChartsPeityChartsModule) },
            { path: 'donut-charts', loadChildren: () => import('./charts-sections/donut-charts/donut-charts.module').then(m => m.ChartsDonutChartsModule) },
            { path: 'flot-options', loadChildren: () => import('./charts-sections/flot-options/flot-options.module').then(m => m.ChartsFlotOptionsModule) },
            { path: 'line-charts', loadChildren: () => import('./charts-sections/line-charts/line-charts.module').then(m => m.ChartsLineChartsModule) },
            { path: 'live-chart', loadChildren: () => import('./charts-sections/live-charts/live-charts.module').then(m => m.ChartsLiveChartsModule) },
            { path: 'organization-chart', loadChildren: () => import('./charts-sections/organization-chart/organization-chart.module').then(m => m.ChartsOrganizationChartModule) },
            { path: 'partition-map', loadChildren: () => import('./charts-sections/partition-map/partition-map.module').then(m => m.ChartsPartitionMapModule) },
            { path: 'sankey-chart', loadChildren: () => import('./charts-sections/sankey-chart/sankey-charts.module').then(m => m.ChartsSankeyChartModule) },
            { path: 'scrollable-chart', loadChildren: () => import('./charts-sections/scrollable-chart/scrollable-chart.module').then(m => m.ChartsScrollableChartModule) },
            { path: 'social-chart', loadChildren: () => import('./charts-sections/social-chart/social-chart.module').then(m => m.ChartsSocialChartModule) },
            { path: 'spark-charts', loadChildren: () => import('./charts-sections/spark-charts/spark-charts.module').then(m => m.ChartsSparkChartsModule) },
            { path: 'timeline-chart', loadChildren: () => import('./charts-sections/timeline-chart/timeline-chart.module').then(m => m.ChartsTimelineChartModule) }
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
        TabsetModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [ChartsPageComponent],
    declarations: [ChartsPageComponent]
})
export class ChartsPageModule {

}
