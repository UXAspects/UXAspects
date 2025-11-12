import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { NgChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsLiveChartComponent } from './live-chart/live-chart.component';

const SECTIONS = [ChartsLiveChartComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Live Chart'),
    },
  },
];

@NgModule({
  imports: [
    NgChartsModule,
    ColorServiceModule,
    DocumentationComponentsModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsLiveChartsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
