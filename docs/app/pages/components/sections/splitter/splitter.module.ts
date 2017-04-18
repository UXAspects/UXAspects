import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsSplitterNg1Component } from './splitter-ng1/splitter-ng1.component';
import { ComponentsNestedSplitterNg1Component } from './nested-splitter-ng1/nested-splitter-ng1.component';
import { ComponentsLayoutSwitchingSplitterNg1Component } from './layout-switching-splitter-ng1/layout-switching-splitter-ng1.component';
import { ComponentsSideInsetPanelSplitterNg1Component } from './side-inset-panel-splitter-ng1/side-inset-panel-splitter-ng1.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers.module';

const SECTIONS = [
    ComponentsSplitterNg1Component,
    ComponentsNestedSplitterNg1Component,
    ComponentsLayoutSwitchingSplitterNg1Component,
    ComponentsSideInsetPanelSplitterNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Splitter')
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
export class ComponentsSplitterModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}