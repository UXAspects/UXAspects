import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, NestedDonutChartModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { NgChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsDonutChartComponent } from './donut-chart/donut-chart.component';
import { ChartsNestedDonutChartComponent } from './nested-donut-chart/nested-donut-chart.component';

const SECTIONS = [ChartsDonutChartComponent, ChartsNestedDonutChartComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Donut Charts'),
    },
  },
];

@NgModule({
  imports: [
    NgChartsModule,
    ColorServiceModule,
    CommonModule,
    DocumentationComponentsModule,
    NestedDonutChartModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsDonutChartsModule {
  constructor() {
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    const resolverService = inject(ResolverService);

    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
