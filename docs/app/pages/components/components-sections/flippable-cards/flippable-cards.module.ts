import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, FlippableCardModule, HybridModule, SparkModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { WrappersModule } from '../../../../wrappers/wrappers.module';
import { ComponentsFlippableCardsNg1Component } from './flippable-cards-ng1/flippable-cards-ng1.component';
import { ComponentsFlippableCardsComponent } from './flippable-cards/flippable-cards.component';


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
        A11yModule,
        CommonModule,
        WrappersModule,
        HybridModule,
        TabsetModule,
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