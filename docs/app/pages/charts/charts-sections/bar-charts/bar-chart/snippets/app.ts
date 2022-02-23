import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { Chart, ChartDataset, ChartOptions, ChartType, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    // access the chart directive properties
    @ViewChild(BaseChartDirective, { static: true }) baseChart: BaseChartDirective;


    barChartData: ChartDataset[];
    barChartLabels: string[] = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt', '.csv', '.mht'];
    barChartType: ChartType = 'bar';
    barChartOptions: ChartOptions<'bar'>;
    barChartLegend: boolean = false;
    barChartColors: any;

    constructor(colorService: ColorService) {

        // Prepare colors used in chart
        const borderColor = colorService.getColor('grey2').setAlpha(0.5).toRgba();
        const barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        const barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
        const barBorderColor = colorService.getColor('chart1').toHex();
        const tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.barChartData = [{
            data: [34, 25, 19, 34, 32, 44, 50, 67],
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 1,
            backgroundColor: barBackgroundColor,
            borderColor: barBorderColor,
            hoverBackgroundColor: barHoverBackgroundColor,
            hoverBorderColor: barBorderColor,
        }];

        this.barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: true,
                        borderColor,
                        color: 'transparent'
                    }
                },
                y: {
                    type: 'linear',
                    min: 0,
                    max: 80,
                    ticks: {
                        stepSize: 20
                    },
                    grid: {
                        display: true,
                        borderColor
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: tooltipBackgroundColor,
                    cornerRadius: 0,
                    callbacks: {
                        title: (item: TooltipItem<'bar'>[])=> {
                            return null;
                        },
                        label: (item: TooltipItem<'bar'>) => {
                            return `x: ${item.label}, y: ${item.formattedValue}`;
                        }
                    },
                    displayColors: false
                }
            }
        };
    }

    ngAfterViewInit() {

        // get instance of the chart
        const chartInstance = this.baseChart.chart;

        // create reference to Chart with type of any
        const chartJs = Chart as any;

        // Added dashed borders to forecast data
        chartJs.helpers.each(chartInstance.getDatasetMeta(0).data, (bar: any, index: number) => {

            // only alter the bars that are forecast data
            if (index >= 6) {
                bar.draw = function() {
                    chartInstance.ctx.save();
                    chartInstance.ctx.setLineDash([2, 2]);
                    chartJs.elements.Rectangle.prototype.draw.apply(this, arguments);
                    chartInstance.ctx.restore();
                };
            }
        });
    }

}