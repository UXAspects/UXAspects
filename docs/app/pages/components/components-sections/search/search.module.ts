import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsSearchBuilderNg1Component } from './search-builder-ng1/search-builder-ng1.component';
import { ComponentsSearchHistoryNg1Component } from './search-history-ng1/search-history-ng1.component';
import { ComponentsSearchToolbarNg1Component } from './search-toolbar-ng1/search-toolbar-ng1.component';
import { ComponentsSearchBuilderComponent } from './search-builder/search-builder.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchBuilderModule } from '../../../../../../src/index';

const SECTIONS = [
    ComponentsSearchBuilderNg1Component,
    ComponentsSearchHistoryNg1Component,
    ComponentsSearchToolbarNg1Component,
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
        WrappersModule,
        TabsModule,
        ModalModule.forRoot(),
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        SearchBuilderModule
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