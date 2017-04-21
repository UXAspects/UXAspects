import { Component, ViewChild } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'uxd-charts-live-chart',
    templateUrl: './live-chart.component.html'
})
@DocumentationSectionComponent('ChartsLiveChartComponent')
export class ChartsLiveChartComponent {

    // access the chart directive properties
    @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

    // configure the directive data
    lineChartData: Chart.ChartDataSets[];
    lineChartOptions: Chart.ChartOptions;
    lineChartLegend: boolean = false;
    lineChartColors: any;

    private livedata: number[] = [];

    constructor(colorService: ColorService) {

        let gridColor = colorService.getColor('grey6').toHex();
        let lineBorderColor = colorService.getColor('chart1').toRgb();
        let lineFillColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        let lineForecastFillColor = colorService.getColor('chart1').setAlpha(0.06).toRgba();
        let pointBorderColor = colorService.getColor('chart1').setAlpha(0.5).toRgba();

        // set the initial chart data
        this.updateChartData();

        this.lineChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            animation: false,
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        min: 0,
                        max: 299,
                        step: 50,
                        fontSize: 0 /* Hide Labels on X Axis */
                    } as Chart.LinearTickOptions,
                    gridLines: {
                        color: gridColor
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 25
                    } as Chart.LinearTickOptions,
                    gridLines: {
                        color: gridColor
                    }
                }]
            },
            tooltips: {
                enabled: false
            }
        };

        this.lineChartColors = [
            {
                borderColor: lineBorderColor,
                backgroundColor: lineFillColor,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent'
            }
        ];

        setInterval(() => {
            // update chart data every 40ms
            this.updateChartData();
        }, 40);
    }

    updateChartData() {

        // instatiate new array to trigger change detection
        this.lineChartData = new Array<Chart.ChartDataSets>();

        this.lineChartData.push({
            data: this.getRandomData(),
            borderWidth: 1
        });
    }

    getRandomData(): { x: number, y: number}[] {

        if (this.livedata.length) {
            this.livedata = this.livedata.slice(1);
        }

        while (this.livedata.length < 300) {
            let previous = this.livedata.length ? this.livedata[this.livedata.length - 1] : 50;
            let y = previous + Math.random() * 10 - 5;

            this.livedata.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }

        // zip the generated y values with the x values
        let res = [];
        for (let i = 0; i < this.livedata.length; ++i) {
            res.push({
                x: i,
                y: this.livedata[i]
            });
        }

        return res;
    }

}