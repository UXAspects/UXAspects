import { Component, ViewChild } from '@angular/core';
import { ColorService, TimelineChartOptions } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, ScatterDataPoint } from 'chart.js';
import 'chartjs-adapter-moment';
import { BaseChartDirective } from 'ng2-charts';
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

    @ViewChild(BaseChartDirective, { static: true }) baseChart: BaseChartDirective;

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
            imports: ['NgChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule', 'TimelineChartModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    lineChartData: ChartDataset[];
    lineChartOptions: ChartOptions<'line'>;
    lineChartLabels: string[];

    timelineChartData: ChartDataset[];
    timelineChartLabels: string[];
    timelineChartOptions: ChartOptions & TimelineChartOptions;

    constructor(private _dataService: TimelineChartService, private _colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        this.lineChartData = [{
            data: this._dataService.getDataset() as ScatterDataPoint[],
            backgroundColor: this._colorService.getColor('alternate3').setAlpha(0.8).toRgba(),
            borderColor: 'transparent',
            pointRadius: 0,
            pointHitRadius: 0,
            borderWidth: 1,
            fill: 'origin'
        }];

        console.log(this.lineChartData);

        this.lineChartOptions = {
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
                x: {
                    type: 'time',
                    grid: {
                        display: false
                    },
                    time: {
                        unit: 'month'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 1000,
                    ticks: {
                        stepSize: 250,
                        padding: 8,
                    }
                }
            }
        };

        this.timelineChartData = [{
            data: this._dataService.getDataset() as ScatterDataPoint[],
            backgroundColor: this._colorService.getColor('alternate3').setAlpha(0.8).toRgba(),
            borderColor: 'transparent',
            pointRadius: 0,
            pointHitRadius: 0,
            borderWidth: 1,
            fill: 'origin'
        }];

        this.timelineChartOptions = {
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
                x: {
                    type: 'time',
                    grid: {
                        display: false,
                    },
                    time: {
                        unit: 'month',
                        stepSize: 6
                    }
                },
                y: {
                    display: false
                }
            },
            timeline: {
                handles: {
                    tooltip: {
                        label: () => {
                            const data = this.lineChartData[0].data as ScatterDataPoint[];
                            const rangeLower = (data[0].x as unknown as Date).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                            const rangeUpper = (data[data.length - 1].x as unknown as Date).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                            return {rangeLower, rangeUpper};
                        }
                    }
                },
                selectionColor: this._colorService.getColor('alternate3').setAlpha(0.15).toRgba(),
                onChange: (min: Date, max: Date) => {
                    this.lineChartData[0].data = this._dataService.getDataset().filter(point => {
                        return (point.x as unknown as Date).getTime() >= min.getTime() &&
                            (point.x as unknown as Date).getTime() <= max.getTime();
                    });
                    this.baseChart.update();
                },
                range: {
                    lower: new Date(2017, 6, 15),
                    upper: (this.lineChartData[0].data as ScatterDataPoint[])[this.lineChartData[0].data.length - 1].x as unknown as Date,
                    minimum: 8_640_000_000, // 100 days
                    maximum: 110_595_600_000, // 3.5 years
                    tooltip: {
                        label: () => {
                            const data = this.lineChartData[0].data as ScatterDataPoint[];
                            const rangeLower = (data[0].x as unknown as Date).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                            const rangeUpper = (data[data.length - 1].x as unknown as Date).toLocaleDateString([], DATE_LOCALE_OPTIONS);
                            const label = `${rangeLower} - ${rangeUpper}`;
                            return label;
                        }
                    }
                }
            }
        };
    }
}
