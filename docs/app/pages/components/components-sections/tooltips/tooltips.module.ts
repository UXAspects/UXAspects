import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsStaticTooltipComponent } from './static-tooltip/static-tooltip.component';
import { ComponentsTooltipsComponent } from './tooltips/tooltips.component';

const SECTIONS = [ComponentsStaticTooltipComponent, ComponentsTooltipsComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Tooltips'),
    },
  },
];

@NgModule({
  imports: [
    DocumentationComponentsModule,
    PopoverModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    TooltipModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsTooltipsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
