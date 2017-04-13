import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ChartsLineChartNg1Component } from './line-chart-ng1/line-chart-ng1.component';
import { ChartsMultipleAxisLineChartNg1Component } from './multiple-axis-line-chart-ng1/multiple-axis-line-chart-ng1.component';
import { ChartsStackedLineChartNg1Component } from './stacked-line-chart-ng1/stacked-line-chart-ng1.component';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers.module';
import { DocumentationComponentsModule } from '../../../../components/components.module';

const SECTIONS = [
    ChartsLineChartNg1Component,
    ChartsMultipleAxisLineChartNg1Component,
    ChartsStackedLineChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Line Charts',
                link: 'line-charts',
                sections: [
                    {
                        title: 'Line Chart',
                        component: 'ChartsLineChartNg1Component',
                        version: 'AngularJS'
                    },
                    {
                        title: 'Stacked Line Chart',
                        component: 'ChartsStackedLineChartNg1Component',
                        version: 'AngularJS'
                    },
                    {
                        title: 'Multiple Axis Line Chart',
                        component: 'ChartsMultipleAxisLineChartNg1Component',
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
export class LineChartsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
