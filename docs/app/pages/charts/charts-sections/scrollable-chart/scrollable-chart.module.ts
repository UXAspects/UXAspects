import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, IconModule, TabsetModule } from '@ux-aspects/ux-aspects';
import { NgChartsModule } from 'ng2-charts';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { DocumentationPage, ResolverService } from '../../../../services/resolver/resolver.service';
import { ChartsScrollableChartComponent } from './scrollable-chart/scrollable-chart.component';

const SECTIONS = [ChartsScrollableChartComponent];

const ROUTES = [
  {
    path: '**',
    component: DocumentationCategoryComponent,
    data: {
      category: ResolverService.resolveCategoryData(DocumentationPage.Charts, 'Scrollable Chart'),
    },
  },
];

@NgModule({
  imports: [
    NgChartsModule,
    ColorServiceModule,
    CommonModule,
    DocumentationComponentsModule,
    IconModule,
    RouterModule.forChild(ROUTES),
    TabsetModule,
    ...SECTIONS,
  ],
  exports: SECTIONS,
})
export class ChartsScrollableChartModule {
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    resolverService: ResolverService
  ) {
    resolverService.registerResolver(componentFactoryResolver, SECTIONS);
  }
}
