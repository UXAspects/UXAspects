import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TreeModule } from '@circlon/angular-tree-component';
import { AccessibilityModule, AccordionModule, CheckboxModule, FocusIfModule, IconModule, SelectionModule, TabsetModule, TreeGridModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsTreeGridComponent } from './tree-grid/tree-grid.component';
import { ComponentsTreeViewCustomNodeComponent } from './tree-view-custom-node/tree-view-custom-node.component';
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
        TreeModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS
})
export class ComponentsTreeViewModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
