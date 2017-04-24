import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssNavigationComponent } from './navigation/navigation.component';
import { CssAppNavigatorComponent } from './app-navigator/app-navigator.component';
import { CssNavigationMenuServiceNg1Component } from './navigation-menu-service-ng1/navigation-menu-service-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    CssNavigationComponent,
    CssAppNavigatorComponent,
    CssNavigationMenuServiceNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Side Navigation')
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
export class CssSideNavigationModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}