import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { NgChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsLineChartComponent } from './line-chart/line-chart.component';
import { ChartsMultipleAxisLineChartComponent } from './multiple-axis-line-chart/multiple-axis-line-chart.component';
import { ChartsStackedLineChartComponent } from './stacked-line-chart/stacked-line-chart.component';

const SECTIONS = [
  ChartsLineChartComponent,
  ChartsStackedLineChartComponent,
  ChartsMultipleAxisLineChartComponent,
];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Line Charts'),
    },
  },
];

@NgModule({
  imports: [
    NgChartsModule,
    ColorServiceModule,
    CommonModule,
    DocumentationComponentsModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsLineChartsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
