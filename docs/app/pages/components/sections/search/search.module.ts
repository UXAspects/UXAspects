import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsSearchBuilderNg1Component } from './search-builder-ng1/search-builder-ng1.component';
import { ComponentsSearchHistoryNg1Component } from './search-history-ng1/search-history-ng1.component';
import { ComponentsSearchToolbarNg1Component } from './search-toolbar-ng1/search-toolbar-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsSearchBuilderNg1Component,
    ComponentsSearchHistoryNg1Component,
    ComponentsSearchToolbarNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Search',
                'link': 'search',
                'sections': [
                    {
                        'title': 'Search Builder',
                        'component': 'ComponentsSearchBuilderNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Search History',
                        'component': 'ComponentsSearchHistoryNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Search Toolbar',
                        'component': 'ComponentsSearchToolbarNg1Component',
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
export class ComponentsSearchModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}