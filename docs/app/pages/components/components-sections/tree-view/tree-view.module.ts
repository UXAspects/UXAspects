import { CommonModule } from '@angular/common';
import { NgModule, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsTreeViewNg1Component } from './tree-view-ng1/tree-view-ng1.component';
import { ComponentsTreeViewCompanionViewNg1Component } from './tree-view-companion-view-ng1/tree-view-companion-view-ng1.component';
import { ComponentsTreeGridAsynchronousLoadingNg1Component } from './tree-grid-asynchronous-loading-ng1/tree-grid-asynchronous-loading-ng1.component';
import { ComponentsTreeGridNg1Component } from './tree-grid-ng1/tree-grid-ng1.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsTreeViewComponent } from './tree-view/tree-view.component';

import { TreeModule } from 'angular-tree-component';
import { CheckboxModule } from '../../../../../../src/index';
import { TreeViewService } from './tree-view-custom-node/tree-view-custom-node.service';
import { ComponentsTreeViewCustomNodeComponent } from './tree-view-custom-node/tree-view-custom-node.component';

const SECTIONS = [
    ComponentsTreeViewNg1Component,
    ComponentsTreeViewCompanionViewNg1Component,
    ComponentsTreeGridNg1Component,
    ComponentsTreeGridAsynchronousLoadingNg1Component,
    ComponentsTreeViewComponent,
    ComponentsTreeViewCustomNodeComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Tree View')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        WrappersModule,
        TabsModule,
        TreeModule,
        CheckboxModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS,
    providers: [
        TreeViewService
    ]
})
export class ComponentsTreeViewModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}