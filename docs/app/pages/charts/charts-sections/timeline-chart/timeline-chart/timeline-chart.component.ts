import { Component } from '@angular/core';
import { ColorService, TimelineChartOptions } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { TimelineChartService } from './timeline-chart.service';

const DATE_LOCALE_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
} as const;

@Component({
    selector: 'uxd-charts-timeline-chart',
    templateUrl: './timeline-chart.component.html',
    styleUrls: ['./timeline-chart.component.less'],
    providers: [TimelineChartService]
})
@DocumentationSectionComponent('ChartsTimelineChartComponent')
export class ChartsTimelineChartComponent extends BaseDocumentationSection implements IPlaygroundProvider {

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
                        const data = this.lineChartData;
                        const rangeLower = (<Date>data[0].x).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                        const rangeUpper = (<Date>data[data.length - 1].x).toLocaleDateString([], DATE_LOCALE_OPTIONS);
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
                        const data = this.lineChartData;
                        const rangeLower = (<Date>data[0].x).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                        const rangeUpper = (<Date>data[data.length - 1].x).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                        const label = `${rangeLower} - ${rangeUpper}`;
                        return label;
                    }
                } as any
            }
        }
    };


    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss,
            'timeline-chart.service.ts': this.snippets.raw.dataTs
        },
        modules: [{
            library: 'chart.js'
        },
        {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule', 'TimelineChartModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(private _dataService: TimelineChartService, private _colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}
