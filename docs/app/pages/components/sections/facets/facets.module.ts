import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsFacetsNg1Component } from './facets-ng1/facets-ng1.components';
import { ComponentsDynamicFacetsNg1Component } from './dynamic-facets-ng1/dynamic-facets-ng1.components';
import { ComponentsCustomFacetsNg1Component } from './custom-facets-ng1/custom-facets-ng1.component';
import { ComponentsFacetLineChartNg1Component } from './facet-line-chart-ng1/facet-line-chart-ng1.component';
import { ComponentsProgrammaticSelectionNg1Component } from './programmatic-selection-ng1/programmatic-selection-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsFacetsNg1Component,
    ComponentsDynamicFacetsNg1Component,
    ComponentsCustomFacetsNg1Component,
    ComponentsFacetLineChartNg1Component,
    ComponentsProgrammaticSelectionNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Facets',
                'link': 'facets',
                'sections': [
                    {
                        'title': 'Facets',
                        'component': 'ComponentsFacetsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Dynamic Facets',
                        'component': 'ComponentsDynamicFacetsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Custom Facets',
                        'component': 'ComponentsCustomFacetsNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Line Chart Example with Facet Panel',
                        'component': 'ComponentsFacetLineChartNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Programmatic Selection',
                        'component': 'ComponentsProgrammaticSelectionNg1Component',
                        'version': 'AngularJS'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsFacetsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}