import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ColorService } from 'ux-aspects';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent implements AfterViewInit {

    // access the chart directive properties
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

    constructor(colorService: ColorService) {

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