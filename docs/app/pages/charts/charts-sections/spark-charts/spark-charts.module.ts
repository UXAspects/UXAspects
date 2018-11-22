import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, HybridModule, SparkModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ChartsSparkChartNg1Component } from './spark-chart-ng1/spark-chart-ng1.component';
import { ChartsSparkChartsComponent } from './spark-charts/spark-charts.component';


const SECTIONS = [
    ChartsSparkChartNg1Component,
    ChartsSparkChartsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Spark Charts')
        }
    }
];

@NgModule({
    imports: [
        TabsetModule,
        WrappersModule,
        HybridModule,
        SparkModule,
        ColorServiceModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ChartsSparkChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
