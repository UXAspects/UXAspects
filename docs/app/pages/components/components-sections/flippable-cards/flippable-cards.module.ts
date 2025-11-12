import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AccessibilityModule,
  ColorServiceModule,
  FlippableCardModule,
  IconModule,
  NestedDonutChartModule,
  SparkModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsFlippableCardsComponent } from './flippable-cards/flippable-cards.component';

const SECTIONS = [ComponentsFlippableCardsComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(
        DocumentationPage.Components,
        'Flippable Cards'
      ),
    },
  },
];

@NgModule({
  imports: [
    A11yModule,
    AccessibilityModule,
    ColorServiceModule,
    CommonModule,
    DocumentationComponentsModule,
    FlippableCardModule,
    IconModule,
    NestedDonutChartModule,
    RouterModule.forChild(ROUTES),
    SparkModule,
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsFlippableCardsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
