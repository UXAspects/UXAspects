import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsProgressBarNg1Component } from './progress-bar-ng1/progress-bar-ng1.component';
import { WrappersModule } from '../../../../wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressBarModule } from '../../../../../../src/index';

const SECTIONS = [
    ComponentsProgressBarNg1Component,
    ComponentsProgressBarComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Progress')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        TabsModule,
        ProgressBarModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsProgressModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}