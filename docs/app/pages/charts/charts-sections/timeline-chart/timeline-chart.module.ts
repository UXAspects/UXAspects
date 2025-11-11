import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, TabsetModule, TimelineChartModule } from '@ux-aspects/ux-aspects';
import { NgChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsTimelineChartComponent } from './timeline-chart/timeline-chart.component';

const SECTIONS = [ChartsTimelineChartComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Timeline Chart'),
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
    TimelineChartModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsTimelineChartModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
