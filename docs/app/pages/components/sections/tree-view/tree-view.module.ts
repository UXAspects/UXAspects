import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsTreeViewNg1Component } from './tree-view-ng1/tree-view-ng1.component';
import { ComponentsTreeViewCompanionViewNg1Component } from './tree-view-companion-view-ng1/tree-view-companion-view-ng1.component';
import { ComponentsTreeGridAsynchronousLoadingNg1Component } from './tree-grid-asynchronous-loading-ng1/tree-grid-asynchronous-loading-ng1.component';
import { ComponentsTreeGridNg1Component } from './tree-grid-ng1/tree-grid-ng1.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers.module';

const SECTIONS = [
    ComponentsTreeViewNg1Component,
    ComponentsTreeViewCompanionViewNg1Component,
    ComponentsTreeGridNg1Component,
    ComponentsTreeGridAsynchronousLoadingNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                'title': 'Tree View',
                'link': 'tree-view',
                'sections': [
                    {
                        'title': 'Tree View',
                        'component': 'ComponentsTreeViewNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Tree View with Companion View',
                        'component': 'ComponentsTreeViewCompanionViewNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Tree Grid',
                        'component': 'ComponentsTreeGridNg1Component',
                        'version': 'AngularJS'
                    },
                    {
                        'title': 'Tree Grid Asynchronous Loading',
                        'component': 'ComponentsTreeGridAsynchronousLoadingNg1Component',
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
export class ComponentsTreeViewModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}