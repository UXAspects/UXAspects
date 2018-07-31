import { A11yModule } from '@angular/cdk/a11y';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { FocusIfModule } from './../../../../../../src/directives/focus-if/focus-if.module';
import { ComponentsHotkeysNg1Component } from './hotkeys-ng1/hotkeys-ng1.component';
import { ComponentsHotkeysComponent } from './hotkeys/hotkeys.component';
import { ComponentsKeyboardServiceNg1Component } from './keyboard-service-ng1/keyboard-service-ng1.component';


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
        TabsModule.forRoot(),
        FocusIfModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        A11yModule
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