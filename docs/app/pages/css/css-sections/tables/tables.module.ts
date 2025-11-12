import { NgModule, ComponentFactoryResolver, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { CssCardsComponent } from './cards/cards.component';
import { CssTablesComponent } from './tables/tables.component';

const SECTIONS = [CssTablesComponent, CssCardsComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Tables'),
    },
  },
];

@NgModule({
  imports: [DocumentationComponentsModule, RouterModule.forChild(ROUTES), ...SECTIONS],
  exports: SECTIONS,
})
export class CssTablesModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
