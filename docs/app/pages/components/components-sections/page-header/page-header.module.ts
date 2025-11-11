import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsPageHeaderComponent } from './page-header/page-header.component';

const SECTIONS = [ComponentsPageHeaderComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Page Header'),
    },
  },
];

@NgModule({
  imports: [
    TabsetModule,
    PageHeaderModule,
    DocumentationComponentsModule,
    RouterModule.forChild(ROUTES),
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsPageHeaderModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
