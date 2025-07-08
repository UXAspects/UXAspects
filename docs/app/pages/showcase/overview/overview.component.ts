import { Component } from '@angular/core';
import { FullPageLayoutComponent } from '../../../components/full-page-layout/full-page-layout.component';
import { PageHeaderComponent } from '../../../components/page-header/page-header.component';
import { ShowcaseCardComponent } from '../../../components/showcase-card/showcase-card.component';

@Component({
  selector: 'uxd-showcase-overview',
  templateUrl: './overview.component.html',
  imports: [PageHeaderComponent, FullPageLayoutComponent, ShowcaseCardComponent],
})
export class ShowcaseOverviewPageComponent {
  organizationChartImage = 'assets/img/showcase/organization-chart.jpg';
  partitionMapImage = 'assets/img/showcase/partition-map.jpg';
  sankeyChartImage = 'assets/img/showcase/sankey-chart.jpg';

  organizationChartUrl = '#/showcase/visualizations/organization-chart';
  partitionMapUrl = '#/showcase/visualizations/partition-map';
  sankeyChartUrl = '#/showcase/visualizations/sankey-chart';
}
