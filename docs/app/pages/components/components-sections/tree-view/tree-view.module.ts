import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule, CheckboxModule, FocusIfModule, HybridModule, SelectionModule, TabsetModule, TreeGridModule } from '../../../../../../src/index';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsTreeGridAsynchronousLoadingNg1Component } from './tree-grid-asynchronous-loading-ng1/tree-grid-asynchronous-loading-ng1.component';
import { ComponentsTreeGridNg1Component } from './tree-grid-ng1/tree-grid-ng1.component';
import { ComponentsTreeGridComponent } from './tree-grid/tree-grid.component';
import { ComponentsTreeViewCompanionViewNg1Component } from './tree-view-companion-view-ng1/tree-view-companion-view-ng1.component';
import { ComponentsTreeViewCustomNodeComponent } from './tree-view-custom-node/tree-view-custom-node.component';
import { TreeViewService } from './tree-view-custom-node/tree-view-custom-node.service';
import { ComponentsTreeViewNg1Component } from './tree-view-ng1/tree-view-ng1.component';
import { ComponentsTreeViewComponent } from './tree-view/tree-view.component';

const SECTIONS = [
    ComponentsTreeViewNg1Component,
    ComponentsTreeViewCompanionViewNg1Component,
    ComponentsTreeGridComponent,
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
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FocusIfModule,
        FormsModule,
        HybridModule,
        RouterModule.forChild(ROUTES),
        SelectionModule,
        TabsModule,
        TabsetModule,
        TreeGridModule,
        TreeModule,
        WrappersModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS,
    providers: [
        TreeViewService,
        {
            provide: '$templateCache',
            useFactory: (injector: Injector) => injector.get('$templateCache'),
            deps: ['$injector']
        },
        {
            provide: '$timeout',
            useFactory: (injector: Injector) => injector.get('$timeout'),
            deps: ['$injector']
        },
        {
            provide: '$q',
            useFactory: (injector: Injector) => injector.get('$q'),
            deps: ['$injector']
        },
        {
            provide: '$displayPanel',
            useFactory: (injector: Injector) => injector.get('$displayPanel'),
            deps: ['$injector']
        }
    ]
})
export class ComponentsTreeViewModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}