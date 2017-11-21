import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsNavigationComponent } from './navigation/navigation.component';
import { ComponentsAppNavigatorComponent } from './app-navigator/app-navigator.component';
import { ComponentsMenuButtonComponent } from './menu-button/menu-button.component';
import { ComponentsNavigationMenuServiceNg1Component } from './navigation-menu-service-ng1/navigation-menu-service-ng1.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsNavigationComponent,
    ComponentsAppNavigatorComponent,
    ComponentsMenuButtonComponent,
    ComponentsNavigationMenuServiceNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Side Navigation')
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        WrappersModule,
        TabsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsSideNavigationModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}