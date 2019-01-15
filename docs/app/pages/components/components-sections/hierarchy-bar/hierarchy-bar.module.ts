import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, HierarchyBarModule, RadioButtonModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsHierarchyBarNg1Component } from './hierarchy-bar-ng1/hierarchy-bar-ng1.component';
import { ComponentsHierarchyBarComponent } from './hierarchy-bar/hierarchy-bar.component';


const SECTIONS = [
    ComponentsHierarchyBarComponent,
    ComponentsHierarchyBarNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Hierarchy Bar')
        }
    }
];

@NgModule({
    imports: [
        AccordionModule,
        DocumentationComponentsModule,
        FormsModule,
        HierarchyBarModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
        TabsetModule,
        WrappersModule,
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsHierarchyBarModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}