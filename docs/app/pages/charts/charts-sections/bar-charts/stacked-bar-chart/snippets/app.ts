import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // configure the directive data
    barChartData: ChartDataset<'bar'>[];
    barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    barChartOptions: ChartOptions<'bar'>;
    barChartLegend: boolean = false;
    barChartColors: any;

    constructor(private colorService: ColorService) {

        const tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.barChartData = [
            {
                data: this.generateRandomData(),
                barPercentage: 0.6,
                categoryPercentage: 1,
                backgroundColor: this.generateBarColors('chart1').backgroundColor,
                hoverBackgroundColor: this.generateBarColors('chart1').hoverBackgroundColor
            },
            {
                data: this.generateRandomData(),
                barPercentage: 0.6,
                categoryPercentage: 1,
                backgroundColor: this.generateBarColors('chart2').backgroundColor,
                hoverBackgroundColor: this.generateBarColors('chart2').hoverBackgroundColor
            },
            {
                data: this.generateRandomData(),
                barPercentage: 0.6,
                categoryPercentage: 1,
                backgroundColor: this.generateBarColors('chart3').backgroundColor,
                hoverBackgroundColor: this.generateBarColors('chart3').hoverBackgroundColor
            }
        ];

        this.barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            hover: {
                mode: 'nearest'
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        color: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 30000,
                    ticks: {
                        stepSize: 5000,
                        callback: (value: any, index: any, values: any) => {
                            return value + '€';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: tooltipBackgroundColor,
                    cornerRadius: 0,
                    callbacks: {
                        title: (item: TooltipItem<'bar'>[]) => `Sales ${item[0].datasetIndex + 1}`,
                        label: (item: TooltipItem<'bar'>) => `${item.label}€ in cycle ${item.formattedValue}`
                    },
                    displayColors: false
                }
            }
        };
    }

    generateRandomData(): number[] {

        const data: number[] = [];

        // generate random data
        for (let idx = 0; idx < 13; idx++) {
            data.push(Math.floor(Math.random() * 10000));
        }

        return data;
    }

    generateBarColors(baseColor: string) {

        const backgroundColors = [];
        const hoverColors = [];

        for (let idx = 0; idx < 13; idx++) {
            backgroundColors.push(this.colorService.getColor(baseColor).setAlpha(idx < 10 ? 0.7 : 0.3).toRgba());
            hoverColors.push(this.colorService.getColor(baseColor).setAlpha(idx < 10 ? 0.8 : 0.4).toRgba());
        }

        return {
            backgroundColor: backgroundColors,
            hoverBackgroundColor: hoverColors
        };
    }
}
