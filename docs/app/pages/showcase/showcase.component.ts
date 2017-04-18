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

    listviewUrl = process.env.ENV === 'production' ? 'https://uxaspects.github.io/UXAspects/showcase/list_view/dist/index.html' : '/showcase/list_view/dist/#/listview';
    socialChartUrl = process.env.ENV === 'production' ? 'https://uxaspects.github.io/UXAspects/showcase/charts/dist/#/socialchart' : '/showcase/charts/dist/#/socialchart';
    partitionMapUrl = process.env.ENV === 'production' ? 'https://uxaspects.github.io/UXAspects/showcase/charts/dist/#/partitionmap' : '/showcase/charts/dist/#/partitionmap';
    sankeyChartUrl = process.env.ENV === 'production' ? 'https://uxaspects.github.io/UXAspects/showcase/charts/dist/#/sankeychart' : '/showcase/charts/dist/#/sankeychart';

}