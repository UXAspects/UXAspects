import { Component } from '@angular/core';
import { ColorService, DashboardOptions } from '@ux-aspects/ux-aspects';
import 'chance';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // configure the directive data
    lineChartData: ChartDataset[] = [{
        data: [],
        borderWidth: 2,
        fill: false,
        borderColor: this.colorService.getColor('vibrant1').toHex(),
    },
    {
        data: [],
        borderWidth: 2,
        fill: false,
        borderColor: this.colorService.getColor('vibrant2').toHex(),
    }];

    lineChartOptions: ChartOptions<'line'> = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                min: 0,
                max: 49,
                grid: {
                    color: 'transparent'
                },
                ticks: {
                    maxRotation: 0
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#ddd'
                },
                ticks: {
                    stepSize: 100
                }
            }
        },
    };

    lineChartLabels: string[] = [];
    lineChartLegend: boolean = false;

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    constructor(public colorService: ColorService) {

        // generate the chart data
        for (let idx = 0; idx < 50; idx++) {

            let label = '';

            if (idx === 0) {
                label = 'Jan 1, 2017';
            }

            if (idx === 49) {
                label = 'Mar 30, 2017';
            }

            this.lineChartLabels.push(label);

            const dataset1 = this.lineChartData[0].data as any;
            const dataset2 = this.lineChartData[1].data as any;

            dataset1.push({
                x: idx,
                y: chance.integer({ min: 280, max: 460 })
            });

            dataset2.push({
                x: idx,
                y: chance.integer({ min: 50, max: 250 })
            });
        }
    }
}