import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { CssBreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const SECTIONS = [CssBreadcrumbComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Breadcrumbs'),
    },
  },
];

@NgModule({
  imports: [
    DocumentationComponentsModule,
    TabsetModule,
    RouterModule.forChild(ROUTES),
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class CssBreadcrumbsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
