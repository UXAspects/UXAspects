import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-bar-chart',
    templateUrl: './bar-chart.component.html'
})
@DocumentationSectionComponent('ChartsBarChartComponent')
export class ChartsBarChartComponent extends BaseDocumentationSection implements AfterViewInit, IPlunkProvider {

    // access the chart directive properties
    @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.examples.appTs,
            'app.component.html': this.snippets.examples.appHtml,
            'app.component.css': this.snippets.examples.appCss
        },
        modules: [{
            library: 'chart.js'
        },
        {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule'],
            library: 'ux-aspects'
        }],
        mappings: [
            {
                alias: 'chart.js',
                source: 'https://unpkg.com/chart.js@2.5.0/dist/Chart.min.js'
            },
            {
                alias: 'ng2-charts',
                source: 'https://unpkg.com/ng2-charts@1.5.0/bundles/ng2-charts.umd.min.js'
            }
        ]
    };

    // configure the directive data
    barChartData: Chart.ChartData = [{
        data: [34, 25, 19, 34, 32, 44, 50, 67],
        borderWidth: 1
    }];

    barChartLabels: string[] = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt', '.csv', '.mht'];
    barChartOptions: Chart.ChartOptions;
    barChartLegend: boolean = false;
    barChartColors: any;

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        // Prepare colors used in chart
        let borderColor = colorService.getColor('grey2').setAlpha(0.5).toRgba();
        let barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        let barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
        let barBorderColor = colorService.getColor('chart1').toHex();
        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                    barPercentage: 0.5,
                    categoryPercentage: 1,
                    gridLines: {
                        display: true,
                        zeroLineColor: borderColor,
                        color: 'transparent'
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    gridLines: {
                        zeroLineColor: borderColor
                    },
                    ticks: {
                        min: 0,
                        max: 80,
                        stepSize: 20
                    } as Chart.LinearTickOptions
                }]
            },
            tooltips: {
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem) => {
                        return `x: ${ item.xLabel }, y: ${ item.yLabel }`;
                    }
                },
                displayColors: false
            } as any
        };

        this.barChartColors = [
            {
                backgroundColor: barBackgroundColor,
                hoverBackgroundColor: barHoverBackgroundColor,
                borderColor: barBorderColor
            }
        ];

    }

    ngAfterViewInit() {

        // get instance of the chart
        let chartInstance = this.baseChart.chart;

        // create reference to Chart with type of any
        let chartJs = Chart as any;

        // Added dashed borders to forecast data
        chartJs.helpers.each(chartInstance.getDatasetMeta(0).data, (bar: any, index: number) => {

            // only alter the bars that are forecast data
            if (index >= 6) {
                bar.draw = function () {
                    chartInstance.chart.ctx.save();
                    chartInstance.chart.ctx.setLineDash([2, 2]);
                    chartJs.elements.Rectangle.prototype.draw.apply(this, arguments);
                    chartInstance.chart.ctx.restore();
                };
            }
        });
    }

}