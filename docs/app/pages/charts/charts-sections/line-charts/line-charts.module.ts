import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, HybridModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
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
        ChartsModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        HybridModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
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
