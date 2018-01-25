import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { ComponentsFlippableCardsNg1Component } from './flippable-cards-ng1/flippable-cards-ng1.component';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsFlippableCardsComponent } from './flippable-cards/flippable-cards.component';
import { FlippableCardModule, ColorServiceModule, SparkModule } from '../../../../../../src/index';
import { HybridModule } from '../../../../../../src/hybrid/hybrid.module';

const SECTIONS = [
    ComponentsFlippableCardsNg1Component,
    ComponentsFlippableCardsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Flippable Cards')
        }
    }
];

@NgModule({
    imports: [
        WrappersModule,
        HybridModule,
        TabsModule,
        SparkModule,
        FlippableCardModule,
        ColorServiceModule,
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class ComponentsFlippableCardsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}