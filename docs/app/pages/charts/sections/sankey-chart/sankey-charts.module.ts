import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChartsSankeyChartNg1Component } from './sankey-chart-ng1/sankey-chart-ng1.component';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

const SECTIONS = [
    ChartsSankeyChartNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Sankey Chart',
                link: 'sankey-chart',
                sections: [
                    {
                        title: 'Sankey Chart',
                        component: 'ChartsSankeyChartNg1Component',
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
export class SankeyChartModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}
