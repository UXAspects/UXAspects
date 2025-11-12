import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ComponentsPopoverComponent } from './popover/popover.component';

const SECTIONS = [ComponentsPopoverComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Components, 'Popover'),
    },
  },
];

@NgModule({
  imports: [
    DocumentationComponentsModule,
    PopoverModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ComponentsPopoverModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
