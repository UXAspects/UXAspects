import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
import { CssActivityIndicatorAlternativeComponent } from './activity-indicator-alternative/activity-indicator-alternative.component';
import { CssActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';
import { CssMiniActivityIndicatorComponent } from './mini-activity-indicator/mini-activity-indicator.component';

const SECTIONS = [
  CssActivityIndicatorComponent,
  CssActivityIndicatorAlternativeComponent,
  CssMiniActivityIndicatorComponent,
];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Progress'),
    },
  },
];

@NgModule({
  imports: [DocumentationComponentsModule, RouterModule.forChild(ROUTES)],
  exports: SECTIONS,
  declarations: SECTIONS,
})
export class CssProgressModule {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    resolverService: ResolverService
  ) {
    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
