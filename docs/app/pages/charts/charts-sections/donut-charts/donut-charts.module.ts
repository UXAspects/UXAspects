import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, HybridModule, NestedDonutChartModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsDonutChartNg1Component } from './donut-chart-ng1/donut-chart-ng1.component';
import { ChartsDonutChartComponent } from './donut-chart/donut-chart.component';
import { ChartsNestedDonutChartNg1Component } from './nested-donut-chart-ng1/nested-donut-chart-ng1.component';
import { ChartsNestedDonutChartComponent } from './nested-donut-chart/nested-donut-chart.component';

const SECTIONS = [
    ChartsDonutChartNg1Component,
    ChartsNestedDonutChartNg1Component,
    ChartsDonutChartComponent,
    ChartsNestedDonutChartComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Donut Charts')
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
        NestedDonutChartModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS,
    providers: [],
})
export class ChartsDonutChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
