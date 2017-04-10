import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UxAspectsModule } from '../../../../src/index';
import { DocumentationComponentsModule } from '../../components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { upgradeAdapter } from '../../app.module';

import { ChartsBarChartNg1Component } from './sections/bar-charts/bar-chart-ng1/bar-chart-ng1.component';
import { ChartsHorizontalBarChartNg1Component } from './sections/bar-charts/horizontal-bar-chart-ng1/horizontal-bar-chart-ng1.component';
import { ChartsStackedBarChartNg1Component } from './sections/bar-charts/stacked-bar-chart-ng1/stacked-bar-chart-ng1.component';
import { ChartsPeityChartNg1Component } from './sections/peity-charts/peity-charts-ng1/peity-charts-ng1.component';
import { ChartsDonutChartNg1Component } from './sections/donut-charts/donut-chart-ng1/donut-chart-ng1.component';
import { ChartsNestedDonutChartNg1Component } from './sections/donut-charts/nested-donut-chart-ng1/nested-donut-chart-ng1.component';
import { ChartsFlotOptionsNg1Component } from './sections/flot-options/flot-options-ng1/flot-options-ng1.component';
import { ChartsLineChartNg1Component } from './sections/line-charts/line-chart-ng1/line-chart-ng1.component';
import { ChartsStackedLineChartNg1Component } from './sections/line-charts/stacked-line-chart-ng1/stacked-line-chart-ng1.component';
import { ChartsMultipleAxisLineChartNg1Component } from './sections/line-charts/multiple-axis-line-chart-ng1/multiple-axis-line-chart-ng1.component';
import { ChartsLiveChartNg1Component } from './sections/live-charts/live-chart-ng1/live-chart-ng1.component';
import { ChartsOrganizationChartNg1Component } from './sections/organization-chart/organization-chart-ng1/organization-chart-ng1.component';
import { ChartsPartitionMapNg1Component } from './sections/partition-map/partition-map-ng1/partition-map-ng1.component';
import { ChartsSankeyChartNg1Component } from './sections/sankey-chart/sankey-chart-ng1/sankey-chart-ng1.component';
import { ChartsSparkChartNg1Component } from './sections/spark-charts/spark-chart-ng1/spark-chart-ng1.component';
import { ChartsSocialChartNg1Component } from './sections/social-chart/social-chart-ng1/social-chart-ng1.component';
import { ChartsScrollableChartNg1Component } from './sections/scrollable-chart/scrollable-chart-ng1/scrollable-chart-ng1.component';
import { ChartsTimelineChartNg1Component } from './sections/timeline-chart/timeline-chart-ng1/timeline-chart-ng1.component';

const CHART_SECTIONS: any[] = [
    ChartsBarChartNg1Component,
    ChartsHorizontalBarChartNg1Component,
    ChartsStackedBarChartNg1Component,
    ChartsPeityChartNg1Component,
    ChartsDonutChartNg1Component,
    ChartsNestedDonutChartNg1Component,
    ChartsFlotOptionsNg1Component,
    ChartsLineChartNg1Component,
    ChartsStackedLineChartNg1Component,
    ChartsMultipleAxisLineChartNg1Component,
    ChartsLiveChartNg1Component,
    ChartsOrganizationChartNg1Component,
    ChartsPartitionMapNg1Component,
    ChartsSankeyChartNg1Component,
    ChartsSparkChartNg1Component,
    ChartsSocialChartNg1Component,
    ChartsScrollableChartNg1Component,
    ChartsTimelineChartNg1Component,

    upgradeAdapter.upgradeNg1Component('uxFlotNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityLineChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityBarChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityPieChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxPeityUpdatingLineChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxNestedDonutNg1'),
    upgradeAdapter.upgradeNg1Component('uxOrganizationChartNg1'),
    upgradeAdapter.upgradeNg1Component('uxSparkNg1'),
    upgradeAdapter.upgradeNg1Component('uxPartitionMapNg1'),
    upgradeAdapter.upgradeNg1Component('uxSankeyNg1'),
    upgradeAdapter.upgradeNg1Component('uxSocialChartNg1')
];

@NgModule({
    imports: [
        UxAspectsModule,
        DocumentationComponentsModule,
        TabsModule,
        FormsModule,
        CommonModule,
        WrappersModule,
        RouterModule.forChild(ResolverService.resolveRouteComponents(require('../../data/charts-page.json')))
    ],
    exports: CHART_SECTIONS,
    declarations: CHART_SECTIONS,
    providers: [],
})
export class ChartsPageModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
