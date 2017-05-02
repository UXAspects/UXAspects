import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsFacetsNg1Component } from './facets-ng1/facets-ng1.components';
import { ComponentsDynamicFacetsNg1Component } from './dynamic-facets-ng1/dynamic-facets-ng1.components';
import { ComponentsCustomFacetsNg1Component } from './custom-facets-ng1/custom-facets-ng1.component';
import { ComponentsFacetLineChartNg1Component } from './facet-line-chart-ng1/facet-line-chart-ng1.component';
import { ComponentsProgrammaticSelectionNg1Component } from './programmatic-selection-ng1/programmatic-selection-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FacetsModule } from '../../../../../../src/index';
import { ComponentsFacetContainerComponent } from './facet-container/facet-container.component';

const SECTIONS = [
    ComponentsFacetsNg1Component,
    ComponentsDynamicFacetsNg1Component,
    ComponentsCustomFacetsNg1Component,
    ComponentsFacetLineChartNg1Component,
    ComponentsProgrammaticSelectionNg1Component,
    ComponentsFacetContainerComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Facets')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        FacetsModule,
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