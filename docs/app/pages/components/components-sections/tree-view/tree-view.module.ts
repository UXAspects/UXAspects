import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, AccordionModule, CheckboxModule, FocusIfModule, IconModule, SelectionModule, TabsetModule, TreeGridModule } from '@ux-aspects/ux-aspects';
import { TreeModule } from 'angular-tree-component';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsTreeGridComponent } from './tree-grid/tree-grid.component';
import { ComponentsTreeViewCustomNodeComponent } from './tree-view-custom-node/tree-view-custom-node.component';
import { TreeViewService } from './tree-view-custom-node/tree-view-custom-node.service';
import { ComponentsTreeViewComponent } from './tree-view/tree-view.component';

const SECTIONS = [
    ComponentsTreeGridComponent,
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
        AccessibilityModule,
        AccordionModule,
        CheckboxModule,
        CommonModule,
        DocumentationComponentsModule,
        FocusIfModule,
        FormsModule,
        IconModule,
        RouterModule.forChild(ROUTES),
        SelectionModule,
        TabsetModule,
        TreeGridModule,
        TreeModule.forRoot(),
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