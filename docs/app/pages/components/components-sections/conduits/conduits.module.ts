import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, ConduitModule, TabsetModule } from '../../../../../../src';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsConduitComponent } from './conduit/conduit.component';
import { ConduitComponentSearchComponent } from './conduit/example/component-search/component-search.component';
import { ConduitComponentZoneComponent } from './conduit/example/component-zone/component-zone.component';

const SECTIONS = [
    ComponentsConduitComponent,
    ConduitComponentSearchComponent,
    ConduitComponentZoneComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Conduits')
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        ConduitModule,
        CheckboxModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        TabsetModule
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsConduitsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}