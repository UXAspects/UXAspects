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
            { path: 'partition-map', loadChildren: './sections/partition-map/partition-map.module#PartitionMapModule' }
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
    declarations: [ChartsPageComponent],
    providers: [],
})
export class ChartsPageModule {

}
