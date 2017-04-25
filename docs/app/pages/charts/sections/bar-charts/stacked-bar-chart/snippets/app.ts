import { Component } from '@angular/core';
import { ColorService } from 'ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    // configure the directive data
    barChartData: Chart.ChartDataSets[];
    barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    barChartOptions: Chart.ChartOptions;
    barChartLegend: boolean = false;
    barChartColors: any;

    constructor(private colorService: ColorService) {

        let borderColor = colorService.getColor('grey2').setAlpha(0.5).toRgba();
        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        let barBorderColor = colorService.getColor('chart1').toHex();

        this.barChartData = [
            {
                data: this.generateRandomData()
            },
            {
                data: this.generateRandomData()
            },
            {
                data: this.generateRandomData()
            }
        ];

        this.barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            hover: {
                mode: 'nearest'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.6,
                    categoryPercentage: 1,
                    gridLines: {
                        color: 'transparent'
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        min: 0,
                        max: 30000,
                        stepSize: 5000,
                        callback: (value: any, index: any, values: any) => {
                            return value + '€';
                        }
                    } as Chart.LinearTickOptions
                }]
            },
            tooltips: {
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return `Sales ${item[0].datasetIndex + 1}`;
                    },
                    label: (item: Chart.ChartTooltipItem) => {
                        return `${item.yLabel}€ in cycle ${item.index}`;
                    }
                },
                displayColors: false
            } as any
        };

        this.barChartColors = [
            this.generateBarColors('chart1'),
            this.generateBarColors('chart2'),
            this.generateBarColors('chart3')
        ];

    }

    generateRandomData(): number[] {

        let data: number[] = [];

        // generate random data
        for (let idx = 0; idx < 13; idx++) {
            data.push(Math.floor(Math.random() * 10000));
        }

        return data;
    }

    generateBarColors(baseColor: string) {

        let backgroundColors = [];
        let hoverColors = [];

        for (let idx = 0; idx < 13; idx++) {

            backgroundColors.push(
                this.colorService.getColor(baseColor)
                    .setAlpha(idx < 10 ? 0.7 : 0.3)
                    .toRgba());

            hoverColors.push(
                this.colorService.getColor(baseColor)
                    .setAlpha(idx < 10 ? 0.8 : 0.4)
                    .toRgba());
        }

        return {
            backgroundColor: backgroundColors,
            hoverBackgroundColor: hoverColors
        };
    }

}