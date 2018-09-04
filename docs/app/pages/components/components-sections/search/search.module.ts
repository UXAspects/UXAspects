import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule, ColorServiceModule, FocusIfModule, ItemDisplayPanelModule, RadioButtonModule, SearchBuilderModule, SelectListModule, ToggleSwitchModule, ToolbarSearchModule, TooltipModule, TabsetModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsSearchBuilderNg1Component } from './search-builder-ng1/search-builder-ng1.component';
import { ComponentsSearchBuilderComponent } from './search-builder/search-builder.component';
import { ComponentsSearchHistoryNg1Component } from './search-history-ng1/search-history-ng1.component';
import { ComponentsSearchToolbarNg1Component } from './search-toolbar-ng1/search-toolbar-ng1.component';
import { ComponentsToolbarSearchComponent } from './toolbar-search/toolbar-search.component';

const SECTIONS = [
    ComponentsSearchBuilderNg1Component,
    ComponentsSearchHistoryNg1Component,
    ComponentsSearchToolbarNg1Component,
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
        TabsModule,
        ToggleSwitchModule,
        ToolbarSearchModule,
        TooltipModule,
        WrappersModule,
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