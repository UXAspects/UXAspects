import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-charts-spark-chart-ng1',
    templateUrl: './spark-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsSparkChartNg1Component')
export class ChartsSparkChartNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    charts: ISparkChart[];

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.chartHtml,
        htmlAttributes: {
            'ng-controller': 'SparkChartCtrl as vm'
        },
        js: [this.snippets.raw.chartJs],
        css: [this.snippets.raw.chartCss]
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        this.charts = [
            {
                type: 'spark-chart1',
                value: 35,
                fillHeight: 8,
                topLeftLabel: `<span class='spark-label'>21.7 MB</span>`,
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
                fillHeight: 8,
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
                fillHeight: 8,
                topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
            },
            {
                type: 'spark-chart5',
                value: 30,
                fillHeight: 8,
                topLeftLabel: '<span class="spark-label">21.7 MB</span>',
                topRightLabel: '<span class="spark-label">75.0 MB</span>',
                bottomLeftLabel: '<span class="spark-label">ITEMS ON HOLD</span>',
                bottomRightLabel: '<span class="spark-label">TOTAL</span>'
            },
            {
                barColor: ['#1aac60', '#fcdb1f', '#e5004c'],
                value: [70, 20, 10],
                fillHeight: 6,
                topLeftLabel: "<span class='spark-label'>Multi-value</span>",
                tooltip: ['Complete', 'In Progress', 'To Do']
            },
            {
                type: 'spark-vibrant2',
                value: 30,
                fillHeight: 8,
                topLeftLabel: '30%',
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
                topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0 MB</span></span>',
                bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
            }
        ];
    }
}

interface ISparkChart {
    type?: string;
    barColor?: string | string[];
    value: number | number[];
    fillHeight?: number;
    topLeftLabel?: string;
    topRightLabel?: string;
    bottomLeftLabel?: string;
    bottomRightLabel?: string;
    inlineLabel?: string;
    tooltip?: string | string[];
}