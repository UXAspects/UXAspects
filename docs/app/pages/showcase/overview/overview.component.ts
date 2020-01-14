import { Component } from '@angular/core';

@Component({
    selector: 'uxd-showcase-overview',
    templateUrl: './overview.component.html',
})
export class ShowcaseOverviewPageComponent {

    organizationChartImage = require('!file-loader?name=[path][name].[ext]!../../../assets/img/showcase/organization-chart.jpg');
    partitionMapImage = require('!file-loader?name=[path][name].[ext]!../../../assets/img/showcase/partition-map.jpg');
    sankeyChartImage = require('!file-loader?name=[path][name].[ext]!../../../assets/img/showcase/sankey-chart.jpg');

    organizationChartUrl = '#/showcase/visualizations/organization-chart';
    partitionMapUrl = '#/showcase/visualizations/partition-map';
    sankeyChartUrl = '#/showcase/visualizations/sankey-chart';

}