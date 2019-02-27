import { Component } from '@angular/core';
import { ColorService, TimelineChartOptions, TimelineChartPlugin } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { TimelineChartService } from './timeline-chart.service';

@Component({
    selector: 'uxd-charts-timeline-chart',
    templateUrl: './timeline-chart.component.html',
    styleUrls: ['./timeline-chart.component.less'],
    providers: [TimelineChartService]
})
@DocumentationSectionComponent('ChartsTimelineChartComponent')
export class ChartsTimelineChartComponent extends BaseDocumentationSection {

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
                        padding: 8
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
            backgroundColor: this._colorService.getColor('chart1').setAlpha(0.1).toRgba(),
            borderColor: this._colorService.getColor('chart1').setAlpha(0.5).toRgba(),
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
                    }
                }
            ],
            yAxes: [
                {
                    display: false
                }
            ]
        },
        timeline: {
            selectionColor: this._colorService.getColor('chart1').setAlpha(0.1).toRgba(),
            onChange: (min: Date, max: Date) => {
                this.lineChartData = this._dataService.getDataset().filter(point => {
                    return (point.x as Date).getTime() >= min.getTime() && (point.x as Date).getTime() <= max.getTime();
                });
            },
            handles: {
                focusIndicatorColor: this._colorService.getColor('primary').setAlpha(0.8).toRgba()
            },
            range: {
                lower: new Date(2017, 6, 15),
                upper: this.lineChartData[this.lineChartData.length - 1].x as Date,
                minimum: 8_640_000_000, // 100 days
                maximum: 110_595_600_000, // 3.5 years
            }
        }
    };

    constructor(private _dataService: TimelineChartService, private _colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
        TimelineChartPlugin.register();
    }
}