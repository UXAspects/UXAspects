import { Component } from '@angular/core';

@Component({
    selector: 'uxd-showcase',
    templateUrl: './showcase.component.html'
})
export class ShowcasePageComponent {

    listviewImage = require('!file-loader?name=[path][name].[ext]!../../assets/img/showcase/listview.jpg');
    socialChartImage = require('!file-loader?name=[path][name].[ext]!../../assets/img/showcase/social-chart.jpg');
    partitionMapImage = require('!file-loader?name=[path][name].[ext]!../../assets/img/showcase/partition-map.jpg');
    sankeyChartImage = require('!file-loader?name=[path][name].[ext]!../../assets/img/showcase/sankey-chart.jpg');

    listviewUrl = 'showcase/list_view/dist/#/listview';
    socialChartUrl = 'showcase/charts/dist/#/socialchart';
    partitionMapUrl = 'showcase/charts/dist/#/partitionmap';
    sankeyChartUrl = 'showcase/charts/dist/#/sankeychart';

}