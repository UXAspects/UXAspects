import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';
import { ColorService, PdfExportService, DashboardOptions } from 'ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {

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

     // this can go

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

    custodians: string[] = [];

    options: DashboardOptions = {
        columns: 3,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    constructor(public colorService: ColorService, private _pdfExportService: PdfExportService) {

        this.getCustodians();

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

     getCustodians() {
        for (let i = 0; i < 14; i++) {
            this.custodians.push(chance.name());
        }
    }

    getDocument() {
        let output = this._pdfExportService.getDocument();
        window.open('about:blank', '', '_blank').document.write(output.outerHTML);
    }

}