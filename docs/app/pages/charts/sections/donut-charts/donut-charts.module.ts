import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ChartsDonutChartNg1Component } from './donut-chart-ng1/donut-chart-ng1.component';
import { ChartsNestedDonutChartNg1Component } from './nested-donut-chart-ng1/nested-donut-chart-ng1.component';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationComponentsModule } from '../../../../components/components.module';

const SECTIONS = [
    ChartsDonutChartNg1Component,
    ChartsNestedDonutChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Donut Charts',
                link: 'donut-charts',
                sections: [
                    {
                        title: 'Donut Chart',
                        component: 'ChartsDonutChartNg1Component',
                        version: 'AngularJS'
                    },
                    {
                        title: 'Nested Donut Chart',
                        component: 'ChartsNestedDonutChartNg1Component',
                        version: 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        TabsModule,
        WrappersModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS,
    providers: [],
})
export class DonutChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
