import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, Tick, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { MultipleAxisLineChartService } from './multiple-axis-line-chart.service';

@Component({
    selector: 'uxd-charts-multi-axis-line-chart',
    templateUrl: './multiple-axis-line-chart.component.html',
    styleUrls: ['./multiple-axis-line-chart.component.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [MultipleAxisLineChartService]
})
@DocumentationSectionComponent('ChartsMultipleAxisLineChartComponent')
export class ChartsMultipleAxisLineChartComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.lineChartTs,
            'app.component.html': this.snippets.raw.lineChartHtml,
            'app.component.css': this.snippets.raw.lineChartCss,
            'data.service.ts': this.snippets.raw.dataServiceTs
        },
        modules: [{
            library: 'chart.js'
        },
        {
            imports: ['NgChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    // access the chart directive properties
    @ViewChild(BaseChartDirective, { static: true }) baseChart: BaseChartDirective;

    // configure the directive data
    lineChartData: ChartDataset<'line'>[];
    lineChartOptions: ChartOptions<'line'>;
    lineChartColors: any;
    lineChartLegendContents: SafeHtml;
    lineChartPlugins: any;

    constructor(private sanitizer: DomSanitizer, colorService: ColorService, dataService: MultipleAxisLineChartService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        const tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        const gridColor = colorService.getColor('grey6').toHex();

        const lineBorderColor1 = colorService.getColor('chart1').toRgb();
        const lineFillColor1 = colorService
            .getColor('chart1')
            .setAlpha(0.1)
            .toRgba();
        const pointBorderColor1 = colorService
            .getColor('chart1')
            .setAlpha(0.5)
            .toRgba();

        const lineBorderColor2 = colorService.getColor('chart2').toRgb();
        const lineFillColor2 = colorService
            .getColor('chart2')
            .setAlpha(0.1)
            .toRgba();
        const pointBorderColor2 = colorService
            .getColor('chart2')
            .setAlpha(0.5)
            .toRgba();

        const oilPrices = dataService.getOilPrices().map((values: number[]) => {
            return {
                x: values[0],
                y: values[1]
            };
        });

        const exchangeRates = dataService.getExchangeRates().map((values: number[]) => {
            return {
                x: values[0],
                y: values[1]
            };
        });

        this.lineChartPlugins = [{
            beforeInit(chart, args, options) {
                // Make sure we're applying the legend to the right chart
                if (chart.canvas.id === 'chart-id') {

                    const sets = chart.data.datasets.map((dataset: ChartDataset) => {
                        return `<li class="multi-axis-legend-list-item">
                                    <span class="multi-axis-legend-box" style="background-color: ${
                                        dataset.backgroundColor
                                    }; border-color: ${dataset.borderColor}"></span>
                                    <span class="multi-axis-legend-text">${dataset.label}</span>
                                </li>`;
                    });

                    // create html for chart legend
                    return document.getElementById('legend-id').innerHTML = `<ul class="multi-axis-legend-list">${sets.join('')}</ul>`;

                }
            }
        }];

        this.lineChartData = [
            {
                label: 'Oil price ($)',
                data: oilPrices,
                borderWidth: 1,
                yAxisID: 'y',
                borderColor: lineBorderColor1,
                backgroundColor: lineFillColor1,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: pointBorderColor1,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5,
                fill: 'origin'
            },
            {
                label: 'USD/EUR exchange rate',
                data: exchangeRates,
                borderWidth: 1,
                yAxisID: 'y1',
                borderColor: lineBorderColor2,
                backgroundColor: lineFillColor2,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: pointBorderColor2,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5,
                fill: 'origin'
            }
        ];

        this.lineChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            elements: {
                line: {
                    tension: 0
                }
            },
            hover: {
                mode: 'nearest'
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 1167692400000,
                    max: 1220824800000,
                    ticks: {
                        stepSize: 5313240000,
                        callback: (value: number, index: number, ticks: Tick[]) => {
                            const date = new Date(value);
                            return (
                                date.toLocaleString('en', { month: 'short' }) +
                                ' ' +
                                date.toLocaleString('en', { year: 'numeric' })
                            );
                        }
                    }
                },
                y: {
                    position: 'left',
                    min: 0,
                    max: 150,
                    ticks: {
                        stepSize: 50
                    },
                    grid: {
                        color: gridColor
                    }
                },
                y1: {
                    position: 'right',
                    min: 0,
                    max: 0.79,
                    ticks: {
                        stepSize: 0.79 / 3,
                        callback(value: number, index: number, ticks: Tick[]) {
                            return value.toFixed(2) + '€';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: tooltipBackgroundColor,
                    cornerRadius: 0,
                    callbacks: {
                        title: (item: TooltipItem<'line'>[]) => {
                            return null;
                        },
                        label: (item: TooltipItem<'line'>) => {
                            const date = this.formatDateForTooltip(new Date(item.label));
                            if (item.datasetIndex === 1) {
                                const euro = Number(item.formattedValue).toFixed(2);
                                return `USD/EUR exchange rate for ${date} was ${euro}€`;
                            } else {
                                return `Oil price ($) ${date} was ${item.formattedValue}`;
                            }
                        }
                    },
                    displayColors: false
                },
            }
        };
    }

    formatDate(date: number): string {
        return new Date(date).toLocaleDateString();
    }

    formatDateForTooltip(date: Date): string {
        return `${date.getFullYear().toString().substr(-2)}-${date.getMonth()}m-${date.getDate()}d`;
    }
}