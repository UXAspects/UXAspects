import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, SparkModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsSparkChartsComponent } from './spark-charts/spark-charts.component';


const SECTIONS = [
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
        ColorServiceModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        SparkModule,
        TabsetModule,
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
