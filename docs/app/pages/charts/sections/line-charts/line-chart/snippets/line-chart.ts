import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    // configure the directive data
    lineChartData: Chart.ChartData;

    lineChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    lineChartOptions: Chart.ChartOptions;
    lineChartLegend: boolean = false;
    lineChartColors: any;

    constructor(colorService: ColorService) {

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        let gridBorderColor = colorService.getColor('grey4').toHex();
        let gridColor = colorService.getColor('grey6').toHex();
        let lineBorderColor = colorService.getColor('chart1').toRgb();
        let lineFillColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        let lineForecastFillColor = colorService.getColor('chart1').setAlpha(0.06).toRgba();
        let pointBorderColor = colorService.getColor('chart1').setAlpha(0.5).toRgba();

        this.lineChartData = [{
            data: [34, 25, 19, 34, 32, 44],
            borderWidth: 1
        },
        {
            data: [, , , , , 44, 45, 50, 55],
            borderDash: [5],
            borderWidth: 1
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
                xAxes: [{
                    gridLines: {
                        color: gridColor
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    } as Chart.LinearTickOptions,
                    gridLines: {
                        color: gridColor
                    }
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
                        return `x: ${item.xLabel}, y: ${item.yLabel}`;
                    }
                },
                displayColors: false
            } as any
        };

        this.lineChartColors = [
            {
                borderColor: lineBorderColor,
                backgroundColor: lineFillColor,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: pointBorderColor,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5
            },
            {
                borderColor: lineBorderColor,
                backgroundColor: lineForecastFillColor,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                pointHoverBorderColor: pointBorderColor,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5
            }
        ];
    }

}