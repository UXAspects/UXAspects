import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsHelpCenterNg1Component } from './help-center-ng1/help-center-ng1.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsHelpCenterComponent } from './help-center/help-center.component';
import { HelpCenterModule, PageHeaderModule } from '@ux-aspects/ux-aspects';

const SECTIONS = [
    ComponentsHelpCenterNg1Component,
    ComponentsHelpCenterComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Help Center')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        HelpCenterModule,
        PageHeaderModule,
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsHelpCenterModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}