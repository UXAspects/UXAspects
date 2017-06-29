import { Component } from '@angular/core';
import { ColorService, ColorIdentifier } from 'ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    charts: SparkChart[] = [
        {
            value: 35,
            barHeight: 10,
            topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
            tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
        },
        {
            theme: 'chart3',
            value: 30,
            barHeight: 5,
            inlineLabel: '30%'
        },
        {
            theme: 'chart2',
            value: 35,
            barHeight: 10,
            topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
            bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">INDEX COVERAGE</span></span>',
            tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
        },
        {
            theme: 'chart3',
            value: 30,
            barHeight: 5,
            inlineLabel: '<span class="spark-label hidden-spark"><span class="x-large">30%</span></span>',
            topLeftLabel: '<span class="spark-label hidden-xxs"><span class="small">STORAGE ON HOLD</span></span>'
        },
        {
            theme: 'chart4',
            value: 55,
            barHeight: 10,
            topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
        },
        {
            theme: 'chart5',
            value: 30,
            barHeight: 10,
            topLeftLabel: '30%',
            topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
            bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
            bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
        },
        {
            theme: 'vibrant1',
            value: 55,
            barHeight: 10,
            topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
        },
        {
            theme: 'vibrant2',
            value: 30,
            barHeight: 10,
            topLeftLabel: '30%',
            bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
            topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
            bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
        }
    ];

    constructor(private colorService: ColorService) { }

}

interface SparkChart {
    theme?: ColorIdentifier;
    value: number;
    barHeight?: number;
    topLeftLabel?: string;
    topRightLabel?: string;
    bottomLeftLabel?: string;
    bottomRightLabel?: string;
    inlineLabel?: string;
    tooltip?: string;
}
