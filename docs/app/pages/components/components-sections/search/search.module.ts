import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, ColorServiceModule, FocusIfModule, ItemDisplayPanelModule, RadioButtonModule, SearchBuilderModule, SelectListModule, TabsetModule, ToggleSwitchModule, ToolbarSearchModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsSearchBuilderComponent } from './search-builder/search-builder.component';
import { ComponentsToolbarSearchComponent } from './toolbar-search/toolbar-search.component';

const SECTIONS = [
    ComponentsToolbarSearchComponent,
    ComponentsSearchBuilderComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Search')
        }
    }
];

@NgModule({
    imports: [
        A11yModule,
        AccordionModule,
        ColorServiceModule,
        CommonModule,
        DocumentationComponentsModule,
        FocusIfModule,
        FormsModule,
        ItemDisplayPanelModule,
        ModalModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        SearchBuilderModule,
        SelectListModule,
        TabsetModule,
        ToggleSwitchModule,
        ToolbarSearchModule,
        TooltipModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsSearchModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}