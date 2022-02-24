import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // configure the directive data
    lineChartData: ChartDataset<'line'>[];
    lineChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    lineChartOptions: ChartOptions<'line'>;
    lineChartLegend: boolean = false;
    lineChartColors: any;

    constructor(colorService: ColorService) {

        const tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        const gridBorderColor = colorService.getColor('grey4').toHex();
        const gridColor = colorService.getColor('grey6').toHex();
        const lineBorderColor = colorService.getColor('chart1').toRgb();
        const lineFillColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        const lineForecastFillColor = colorService.getColor('chart1').setAlpha(0.06).toRgba();
        const pointBorderColor = colorService.getColor('chart1').setAlpha(0.5).toRgba();

        // configure the directive data
        this.lineChartData = [{
            data: [34, 25, 19, 34, 32, 44],
            borderWidth: 1,
            borderColor: lineBorderColor,
            backgroundColor: lineFillColor,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBorderColor: pointBorderColor,
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5,
            pointHitRadius: 5,
            fill: 'origin'
        },
        {
            data: [, , , , , 44, 45, 50, 55],
            borderDash: [5],
            borderWidth: 1,
            borderColor: lineBorderColor,
            backgroundColor: lineForecastFillColor,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointHoverBorderColor: pointBorderColor,
            pointHoverBorderWidth: 3,
            pointHoverRadius: 5,
            pointHitRadius: 5,
            fill: 'origin'
        }];

        this.lineChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: gridColor
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: tooltipBackgroundColor,
                    cornerRadius: 0,
                    callbacks: {
                        title: (item: TooltipItem<'line'>[]) => {
                            return null;
                        },
                        label: (item: TooltipItem<'line'>) => {
                            return `x: ${item.label}, y: ${item.formattedValue}`;
                        }
                    },
                    displayColors: false
                }
            }
        };
    }
}