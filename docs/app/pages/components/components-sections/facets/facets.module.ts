import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, FacetsModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsCustomFacetComponent } from './custom-facet-component/custom-facet-component.component';
import { SampleCustomFacetComponent } from './custom-facet-component/sample/sample-facet-component.component';
import { ComponentsCustomFacetsNg1Component } from './custom-facets-ng1/custom-facets-ng1.component';
import { ComponentsDynamicFacetsNg1Component } from './dynamic-facets-ng1/dynamic-facets-ng1.components';
import { ComponentsFacetCheckListComponent } from './facet-check-list/facet-check-list.component';
import { ComponentsFacetContainerComponent } from './facet-container/facet-container.component';
import { ComponentsFacetLineChartNg1Component } from './facet-line-chart-ng1/facet-line-chart-ng1.component';
import { ComponentsFacetTypeaheadListComponent } from './facet-typeahead-list/facet-typeahead-list.component';
import { ComponentsFacetsNg1Component } from './facets-ng1/facets-ng1.components';
import { ComponentsProgrammaticSelectionNg1Component } from './programmatic-selection-ng1/programmatic-selection-ng1.component';


const SECTIONS = [
    ComponentsFacetsNg1Component,
    ComponentsDynamicFacetsNg1Component,
    ComponentsCustomFacetsNg1Component,
    ComponentsFacetLineChartNg1Component,
    ComponentsProgrammaticSelectionNg1Component,
    ComponentsFacetContainerComponent,
    ComponentsFacetCheckListComponent,
    ComponentsFacetTypeaheadListComponent,
    ComponentsCustomFacetComponent,
    SampleCustomFacetComponent
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
        CommonModule,
        WrappersModule,
        TabsetModule,
        FacetsModule,
        CheckboxModule,
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