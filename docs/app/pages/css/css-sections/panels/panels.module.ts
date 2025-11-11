import { NgModule, ComponentFactoryResolver, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { CssBasicPanelComponent } from './basic-panel/basic-panel.component';
import { CssEboxPanelComponent } from './ebox-panel/ebox-panel.component';

const SECTIONS = [CssBasicPanelComponent, CssEboxPanelComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Panels'),
    },
  },
];

@NgModule({
  imports: [DocumentationComponentsModule, RouterModule.forChild(ROUTES), ...SECTIONS],
  exports: SECTIONS,
})
export class CssPanelsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
