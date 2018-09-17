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
import { ChartsLineChartNg1Component } from './line-chart-ng1/line-chart-ng1.component';
import { ChartsLineChartComponent } from './line-chart/line-chart.component';
import { ChartsMultipleAxisLineChartNg1Component } from './multiple-axis-line-chart-ng1/multiple-axis-line-chart-ng1.component';
import { ChartsMultipleAxisLineChartComponent } from './multiple-axis-line-chart/multiple-axis-line-chart.component';
import { ChartsStackedLineChartNg1Component } from './stacked-line-chart-ng1/stacked-line-chart-ng1.component';
import { ChartsStackedLineChartComponent } from './stacked-line-chart/stacked-line-chart.component';


const SECTIONS = [
    ChartsLineChartNg1Component,
    ChartsMultipleAxisLineChartNg1Component,
    ChartsStackedLineChartNg1Component,
    ChartsLineChartComponent,
    ChartsStackedLineChartComponent,
    ChartsMultipleAxisLineChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Line Charts')
        }
    }
];

@NgModule({
    imports: [
        TabsetModule,
        WrappersModule,
        HybridModule,
        DocumentationComponentsModule,
        ChartsModule,
        ColorServiceModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsLineChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
