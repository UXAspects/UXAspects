import { Component } from '@angular/core';
import { ColorService, TimelineChartOptions } from '@ux-aspects/ux-aspects';
import moment from 'moment';
import { TimelineChartService } from './timeline-chart.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TimelineChartService]
})
export class AppComponent {

    lineChartData: Chart.ChartPoint[] = this._dataService.getDataset();

    lineChartOptions: Chart.ChartOptions & Chart.ChartLineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        elements: {
            line: {
                tension: 0
            },
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontSize: 12,
                    },
                    type: 'time',
                    gridLines: {
                        display: false
                    },
                    time: {
                        unit: 'month'
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        max: 1000,
                        stepSize: 250,
                        padding: 8,
                        fontSize: 12,
                    },
                    gridLines: {
                        tickMarkLength: 8
                    }
                }
            ]
        }
    };

    lineChartColors: Array<Chart.ChartDataSets> = [
        {
            backgroundColor: this._colorService.getColor('alternate3').setAlpha(0.8).toRgba(),
            borderColor: 'transparent',
            pointRadius: 0,
            pointHitRadius: 0,
            borderWidth: 1
        }
    ];

    timelineChartData: Chart.ChartPoint[] = this._dataService.getDataset();

    timelineChartOptions: Chart.ChartOptions & Chart.ChartLineOptions & TimelineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        elements: {
            line: {
                tension: 0
            },
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    gridLines: {
                        display: false,
                    },
                    time: {
                        unit: 'month',
                        stepSize: 6
                    },
                    ticks: {
                        fontSize: 12,
                    },
                }
            ],
            yAxes: [
                {
                    display: false
                }
            ]
        },
        timeline: {
            handles: {
                tooltip: {
                    label: () => {
                        let data = this.lineChartData;
                        let rangeLower = moment(data[0].x, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
                        let rangeUpper = moment(data[data.length - 1].x, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');

                        return {rangeLower, rangeUpper};
                    }
                } as any
            },
            selectionColor: this._colorService.getColor('alternate3').setAlpha(0.15).toRgba(),
            onChange: (min: Date, max: Date) => {
                this.lineChartData = this._dataService.getDataset().filter(point => {
                    return (point.x as Date).getTime() >= min.getTime() &&
                        (point.x as Date).getTime() <= max.getTime();
                });
            },
            range: {
                lower: new Date(2017, 6, 15),
                upper: this.lineChartData[this.lineChartData.length - 1].x as Date,
                minimum: 8_640_000_000, // 100 days
                maximum: 110_595_600_000, // 3.5 years
                tooltip: {
                    label: () => {
                        let data = this.lineChartData;
                        let rangeLower = moment(data[0].x, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
                        let rangeUpper = moment(data[data.length - 1].x, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
                        let label = `${rangeLower} - ${rangeUpper}`;

                        return label;
                    }
                } as any
            }
        }
    };

    constructor(private _dataService: TimelineChartService, private _colorService: ColorService) { }
}
