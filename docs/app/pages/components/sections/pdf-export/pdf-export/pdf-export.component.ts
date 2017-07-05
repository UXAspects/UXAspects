import { Component, ViewChild } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseChartDirective } from 'ng2-charts';
import { ColorService, DashboardOptions } from '../../../../../../../src/index';
import { Chart } from 'chart.js';
import { PdfExportService } from '../../../../../../../src/components/pdf-export/index';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-pdf-export',
    templateUrl: './pdf-export.component.html',
    styleUrls: ['./pdf-export.component.less']
})
@DocumentationSectionComponent('ComponentsPdfExportComponent')
export class ComponentsPdfExportComponent extends BaseDocumentationSection implements IPlunkProvider  {


    @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

    // configure the directive data
    barChartData: Chart.ChartData = [{
        data: [34, 25, 19, 34, 32, 44, 50, 67],
        borderWidth: 1
    }];

    barChartLabels: string[] = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt', '.csv', '.mht'];
    barChartOptions: Chart.ChartOptions;
    barChartLegend: boolean = false;
    barChartColors: any;

    dataTable = [{
        document: '.doc',
        value: 34,
    }, {
        document: '.ppt',
        value: 25,
    }, {
        document: '.pdf',
        value: 19,
    }, {
        document: '.xls',
        value: 34,
    }, {
        document: '.html',
        value: 32,
    }, {
        document: '.txt',
        value: 44,
    }, {
        document: '.csv',
        value: 50,
    }, {
        document: '.mht',
        value: 67,
    }];

    privacy = [{
        type: 'Employee data',
        value: 139
    }, {
        type: 'Health data',
        value: 56
    }, {
        type: 'Financial',
        value: 34
    }, {
        type: 'Personal ID',
        value: 13
    }, {
        type: 'Other',
        value: 2
    }];

    // configure the directive data
    donutChart1Data: Chart.ChartData = [{
        data: [287, 23],
        borderWidth: 0
    }];

    donutChart2Data: Chart.ChartData = [{
        data: [151, 159],
        borderWidth: 0
    }];

    donutChartOptions: Chart.ChartOptions;
    donutChart1Colors: any;
    donutChart2Colors: any;

    options: DashboardOptions = {
        columns: 3,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        mappings: [
            MAPPINGS.Chance,
            MAPPINGS.ChartJs,
            MAPPINGS.Ng2Charts
        ],
        modules: [{
            imports: ['DashboardModule', 'ColorServiceModule', 'PdfExportModule'],
            library: 'ux-aspects'
        }, {
            library: 'chance'
        },
        {
            library: 'chart.js'
        },
        {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }]
    };

    constructor(colorService: ColorService, private _pdfExportService: PdfExportService) {

        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

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

        this.donutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            cutoutPercentage: 80,
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem, data: any) => {

                        // get the dataset (we only have one)
                        let dataset = data.datasets[0];

                        // get the value of the current segment
                        let segmentValue = dataset.data[item.index];

                        return segmentValue + ' documents';
                    }
                },
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                displayColors: false
            } as any,
            title: {
                display: true,
                position: 'bottom',
                fontStyle: 'none',
                fontFamily: 'Source Sans Pro',
                text: '310 Total Documents'
            }
        };

        this.donutChart1Colors = [
            {
                backgroundColor: [
                    colorService.getColor('chart1').toRgb(),
                    colorService.getColor('grey8').toRgb(),
                ],
                hoverBackgroundColor: [
                    colorService.getColor('chart1').setAlpha(0.3).toRgba(),
                    colorService.getColor('grey8').setAlpha(0.3).toRgba(),
                ]
            }
        ];

        this.donutChart2Colors = [
            {
                backgroundColor: [
                    colorService.getColor('chart2').toRgb(),
                    colorService.getColor('grey8').toRgb(),
                ],
                hoverBackgroundColor: [
                    colorService.getColor('chart2').setAlpha(0.3).toRgba(),
                    colorService.getColor('grey8').setAlpha(0.3).toRgba(),
                ]
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

    getDocument() {
        let output = this._pdfExportService.getDocument();
        window.open('about:blank').document.write(output.outerHTML);
    }

}