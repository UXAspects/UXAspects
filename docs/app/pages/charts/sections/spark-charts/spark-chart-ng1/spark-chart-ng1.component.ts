import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-charts-spark-chart-ng1',
    templateUrl: './spark-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsSparkChartNg1Component')
export class ChartsSparkChartNg1Component implements ICodePenProvider {

    private charts: ISparkChart[];

    private htmlCode = require('./snippets/chart.html');
    private jsCode = require('./snippets/chart.js');
    private cssCode = require('./snippets/chart.css');
    private tooltipsHtml = require('./snippets/tooltips.html');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'SparkChartCtrl as vm'
        },
        js: [this.jsCode],
        css: [this.cssCode]
    };

    constructor() {

        this.charts = [
            {
                type: 'spark-chart1',
                value: 35,
                fillHeight: 10,
                topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
                tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
            },
            {
                type: 'spark-chart3',
                value: 30,
                fillHeight: 5,
                inlineLabel: '30%'
            },
            {
                type: 'spark-chart2',
                value: 35,
                fillHeight: 10,
                topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">INDEX COVERAGE</span></span>',
                tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
            },
            {
                type: 'spark-chart3',
                value: 30,
                fillHeight: 5,
                inlineLabel: '<span class="spark-label hidden-spark"><span class="x-large">30%</span></span>',
                topLeftLabel: '<span class="spark-label hidden-xxs"><span class="small">STORAGE ON HOLD</span></span>'
            },
            {
                type: 'spark-chart4',
                value: 55,
                fillHeight: 10,
                topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
            },
            {
                type: 'spark-chart5',
                value: 30,
                fillHeight: 10,
                topLeftLabel: '30%',
                topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
                bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
            },
            {
                type: 'spark-vibrant1',
                value: 55,
                fillHeight: 10,
                topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
            },
            {
                type: 'spark-vibrant2',
                value: 30,
                fillHeight: 10,
                topLeftLabel: '30%',
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
                topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
                bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
            }
        ];

    }
}

interface ISparkChart {
    type: string;
    value: number;
    fillHeight?: number;
    topLeftLabel?: string;
    topRightLabel?: string;
    bottomLeftLabel?: string;
    bottomRightLabel?: string;
    inlineLabel?: string;
    tooltip?: string;
}