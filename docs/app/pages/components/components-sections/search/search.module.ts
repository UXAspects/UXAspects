import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ColorServiceModule, ItemDisplayPanelModule, RadioButtonModule, SearchBuilderModule, ToggleSwitchModule, ToolbarSearchModule, TooltipModule } from '../../../../../../src/index';
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
        FormsModule,
        RouterModule.forChild(ROUTES),
        CommonModule,
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule,
        DocumentationComponentsModule,
        ItemDisplayPanelModule,
        RadioButtonModule,
        SearchBuilderModule,
        ToggleSwitchModule,
        ToolbarSearchModule,
        WrappersModule,
        ColorServiceModule
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