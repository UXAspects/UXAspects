import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, FacetsModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsCustomFacetComponent } from './custom-facet-component/custom-facet-component.component';
import { SampleCustomFacetComponent } from './custom-facet-component/sample/sample-facet-component.component';
import { ComponentsFacetCheckListComponent } from './facet-check-list/facet-check-list.component';
import { ComponentsFacetContainerComponent } from './facet-container/facet-container.component';
import { ComponentsFacetTypeaheadListComponent } from './facet-typeahead-list/facet-typeahead-list.component';


const SECTIONS = [
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
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FacetsModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
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