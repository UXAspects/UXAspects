import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartitionMapModule, TabsetModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsPartitionMapComponent } from './partition-map/partition-map.component';

const SECTIONS = [ChartsPartitionMapComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Partition Map'),
    },
  },
];

@NgModule({
  imports: [
    DocumentationComponentsModule,
    PartitionMapModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    TooltipModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsPartitionMapModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
