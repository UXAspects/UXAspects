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
    lineChartData?: ChartDataset<'line'>[];
    lineChartOptions: ChartOptions<'line'>;
    lineChartLegend: boolean = false;
    lineChartColors: any;

    gridColor;
    lineBorderColor;
    lineFillColor;

    livedata: number[] = [];

    constructor(colorService: ColorService) {

        this.gridColor = colorService.getColor('grey6').toHex();
        this.lineBorderColor = colorService.getColor('chart1').toRgb();
        this.lineFillColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();

        // set the initial chart data
        this.updateChartData();

        this.lineChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            animation: {
                duration: 0
            },
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 0,
                    max: 299,
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25
                    },
                    grid: {
                        color: this.gridColor
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                }
            }
        };

        setInterval(() => {
            // update chart data every 40ms
            this.updateChartData();
        }, 40);
    }

    updateChartData() {

        // instatiate new array to trigger change detection
        this.lineChartData = new Array<ChartDataset<'line'>>();

        this.lineChartData.push({
            data: this.getRandomData(),
            borderWidth: 1,
            borderColor: this.lineBorderColor,
            backgroundColor: this.lineFillColor,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: 'origin'
        });
    }

    getRandomData(): { x: number, y: number }[] {

        if (this.livedata.length) {
            this.livedata = this.livedata.slice(1);
        }

        while (this.livedata.length < 300) {
            const previous = this.livedata.length ? this.livedata[this.livedata.length - 1] : 50;
            const y = previous + Math.random() * 10 - 5;

            this.livedata.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }

        // zip the generated y values with the x values
        const res = [];
        for (let i = 0; i < this.livedata.length; ++i) {
            res.push({
                x: i,
                y: this.livedata[i]
            });
        }

        return res;
    }

}