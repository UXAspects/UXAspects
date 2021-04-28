import { Component } from '@angular/core';
import { ColorService, TimelineChartOptions } from '@ux-aspects/ux-aspects';
import * as moment from 'moment';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { TimelineChartService } from './timeline-chart.service';

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
        tooltips: {
            mode: 'x-axis',
            intersect: false,
            position: 'custom',


            callbacks: {
                title: function(item, data) {
                    return '';
                },
                    
                label: function(item: Chart.ChartTooltipItem, data: Chart.ChartData) {
                    // console.log("🚀 ~ file: timeline-chart.component.ts ~ line 87 ~ ChartsTimelineChartComponent ~ data", data)
                    // console.log("🚀 ~ file: timeline-chart.component.ts ~ line 87 ~ ChartsTimelineChartComponent ~ item", item)

                    let range = this._chart.options.timeline.range;
                    let rangeLower = moment(range.lower, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
                    let rangeUpper = moment(range.upper, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
                    let label = `${rangeLower} - ${rangeUpper}`;

                    return label;
                }
            }

            // custom: function(tooltipModel) {
            //     // Tooltip Element
            //     var tooltipEl = document.getElementById('chartjs-tooltip');

            //     // Create element on first render
            //     if (!tooltipEl) {
            //         tooltipEl = document.createElement('div');
            //         tooltipEl.id = 'chartjs-tooltip';
            //         tooltipEl.innerHTML = '<table class="bink-calc__tooltip"></table>';
            //         document.body.appendChild(tooltipEl);
            //     }

            //     // Hide if no tooltip
            //     if (tooltipModel.opacity === 0) {
            //         tooltipEl.style.opacity = '0';
            //         return;
            //     }

            //     // Set caret Position
            //     tooltipEl.classList.remove('above', 'below', 'no-transform');
            //     if (tooltipModel.yAlign) {
            //         tooltipEl.classList.add(tooltipModel.yAlign);
            //     } else {
            //         tooltipEl.classList.add('no-transform');
            //     }

            //     function getBody(bodyItem: any) {
            //         return bodyItem.lines;
            //     }

            //     // Set Text
            //     if (tooltipModel.body) {
            //         let range = this._chart.options.timeline.range;

            //         var innerHtml = '<thead>';


            //         innerHtml += '</thead><tbody>';

            //         innerHtml += moment(range.lower, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
            //         innerHtml += ' - '
            //         innerHtml += moment(range.upper, 'ddd MMM DD YYYY HH:mm:ss zzZZ').format('D MMMM YYYY');
            //         innerHtml += '</tbody>';

            //         var tableRoot = tooltipEl.querySelector('table');
            //         tableRoot.innerHTML = innerHtml;
            //     }

            //     // `this` will be the overall tooltip
            //     var position = this._chart.canvas.getBoundingClientRect();

            //     console.log(this._chart);

            //     // Display, position, and set styles for font
            //     tooltipEl.style.opacity = '1';
            //     tooltipEl.style.position = 'absolute';
            //     tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            //     tooltipEl.style.top = position.top + window.pageYOffset + 'px';
            //     tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            //     tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            //     tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            //     tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            //     tooltipEl.style.pointerEvents = 'none';
            // }
        },
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
