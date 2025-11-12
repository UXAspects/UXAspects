import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileSizePipeModule, SankeyChartModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsSankeyChartComponent } from './sankey-chart/sankey-chart.component';

const SECTIONS = [ChartsSankeyChartComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Sankey Chart'),
    },
  },
];

@NgModule({
  imports: [
    DocumentationComponentsModule,
    FileSizePipeModule,
    RouterModule.forChild(ROUTES),
    SankeyChartModule,
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsSankeyChartModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
