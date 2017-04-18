import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsTabsNg1Component } from './tabs-ng1/tabs-ng1.component';
import { ComponentsDetailedTabExampleNg1Component } from './detailed-tab-example-ng1/detailed-tab-example-ng1.component';
import { ComponentsStackedTabsNg1Component } from './stacked-tabs-ng1/stacked-tabs-ng1-component';
import { ComponentsCardTabsNg1Component } from './card-tabs-ng1/card-tabs-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const SECTIONS = [
    ComponentsTabsNg1Component,
    ComponentsDetailedTabExampleNg1Component,
    ComponentsStackedTabsNg1Component,
    ComponentsCardTabsNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Tabs')
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
export class ComponentsTabsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}