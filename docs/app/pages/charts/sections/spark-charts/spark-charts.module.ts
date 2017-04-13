import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ChartsSparkChartNg1Component } from './spark-chart-ng1/spark-chart-ng1.component';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { WrappersModule } from '../../../../wrappers.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

const SECTIONS = [
    ChartsSparkChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Spark Charts',
                link: 'spark-charts',
                sections: [
                    {
                        title: 'Spark Charts',
                        component: 'ChartsSparkChartNg1Component',
                        version: 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        TabsModule,
        WrappersModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class SparkChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
