import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';
import { TabsetModule } from '../../../../../../src/index';
import { ColorServiceModule } from '../../../../../../src/services/color/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsBarChartNg1Component } from './bar-chart-ng1/bar-chart-ng1.component';
import { ChartsBarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsHorizontalBarChartNg1Component } from './horizontal-bar-chart-ng1/horizontal-bar-chart-ng1.component';
import { ChartsHorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';
import { ChartsStackedBarChartNg1Component } from './stacked-bar-chart-ng1/stacked-bar-chart-ng1.component';
import { ChartsStackedBarChartComponent } from './stacked-bar-chart/stacked-bar-chart.component';

const SECTIONS = [
    ChartsBarChartComponent,
    ChartsBarChartNg1Component,
    ChartsHorizontalBarChartNg1Component,
    ChartsStackedBarChartNg1Component,
    ChartsHorizontalBarChartComponent,
    ChartsStackedBarChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Bar Charts')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        DocumentationComponentsModule,
        TabsetModule,
        WrappersModule,
        HybridModule,
        ChartsModule,
        RouterModule.forChild(ROUTES),
        ColorServiceModule
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsBarChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
