import { FocusIfModule } from '@ux-aspects/ux-aspects';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsHotkeysNg1Component } from './hotkeys-ng1/hotkeys-ng1.component';
import { ComponentsKeyboardServiceNg1Component } from './keyboard-service-ng1/keyboard-service-ng1.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsHotkeysComponent } from './hotkeys/hotkeys.component';

const SECTIONS = [
    ComponentsHotkeysComponent,
    ComponentsHotkeysNg1Component,
    ComponentsKeyboardServiceNg1Component
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Keyboard')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        FocusIfModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsKeyboardModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}