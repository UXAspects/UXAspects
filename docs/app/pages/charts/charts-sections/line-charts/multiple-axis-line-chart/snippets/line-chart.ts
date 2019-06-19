import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ColorService } from '@ux-aspects/ux-aspects';
import { BaseChartDirective } from 'ng2-charts';
import { MultipleAxisLineChartService } from './data.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MultipleAxisLineChartService]
})
export class AppComponent implements AfterViewInit {

    // access the chart directive properties
    @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

    // configure the directive data
    lineChartData: Chart.ChartDataSets[];
    lineChartOptions: Chart.ChartOptions;
    lineChartLegend: boolean = false;
    lineChartColors: any;
    lineChartLegendContents: SafeHtml;

    constructor(private sanitizer: DomSanitizer, colorService: ColorService, dataService: MultipleAxisLineChartService) {

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        let gridColor = colorService.getColor('grey6').toHex();

        let lineBorderColor1 = colorService.getColor('chart1').toRgb();
        let lineFillColor1 = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        let pointBorderColor1 = colorService.getColor('chart1').setAlpha(0.5).toRgba();

        let lineBorderColor2 = colorService.getColor('chart2').toRgb();
        let lineFillColor2 = colorService.getColor('chart2').setAlpha(0.1).toRgba();
        let pointBorderColor2 = colorService.getColor('chart2').setAlpha(0.5).toRgba();

        let oilPrices = dataService.getOilPrices().map((values: number[]) => {
            return {
                x: values[0],
                y: values[1]
            };
        });

        let exchangeRates = dataService.getExchangeRates().map((values: number[]) => {
            return {
                x: values[0],
                y: values[1]
            };
        });

        this.lineChartData = [
            {
                label: 'Oil price ($)',
                data: oilPrices,
                borderWidth: 1,
                yAxisID: 'y-axis-1'
            },
            {
                label: 'USD/EUR exchange rate',
                data: exchangeRates,
                borderWidth: 1,
                yAxisID: 'y-axis-2'
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
            legendCallback: (chart: any) => {

                let sets = chart.data.datasets.map((dataset: Chart.ChartDataSets) => {
                    return `<li class="multi-axis-legend-list-item">
                                <span class="multi-axis-legend-box" style="background-color: ${dataset.backgroundColor}; border-color: ${dataset.borderColor}"></span>
                                <span class="multi-axis-legend-text">${dataset.label}</span>
                            </li>`;
                });

                // create html for chart legend
                return `<ul class="multi-axis-legend-list">${sets.join('')}</ul>`;
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        min: 1167692400000,
                        max: 1220824800000,
                        stepSize: 5313240000,
                        callback: (value: number, index: number, values: number[]) => {
                            let date = new Date(value);
                            return date.toLocaleString('en', { month: 'short' })
                                + ' ' + date.toLocaleString('en', { year: 'numeric' });
                        }
                    } as Chart.LinearTickOptions
                }],
                yAxes: [{
                    id: 'y-axis-1',
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 150,
                        stepSize: 50
                    } as Chart.LinearTickOptions,
                    gridLines: {
                        color: gridColor
                    }
                },
                {
                    id: 'y-axis-2',
                    position: 'right',
                    ticks: {
                        min: 0,
                        max: 0.79,
                        stepSize: 0.79 / 3,
                        callback: (value: number, index: number, values: number[]) => {
                            return value.toFixed(2) + '€';
                        }
                    } as Chart.LinearTickOptions,
                    gridLines: {
                        display: false
                    }
                }]
            },
            tooltips: {
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem) => {

                        let date = new Date(item.xLabel);

                        if (item.datasetIndex === 1) {
                            return `USD/EUR exchange rate for ${date.getFullYear().toString().substr(-2)}-${date.getMonth()}m-${date.getDate()}d was ${Number(item.yLabel).toFixed(2)}€`;
                        } else {
                            return `Oil price ($) ${date.getFullYear().toString().substr(-2)}-${date.getMonth()}m-${date.getDate()}d was ${item.yLabel}`;
                        }
                    }
                },
                displayColors: false
            } as any
        } as any;

        this.lineChartColors = [
            {
                borderColor: lineBorderColor1,
                backgroundColor: lineFillColor1,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: pointBorderColor1,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5
            },
            {
                borderColor: lineBorderColor2,
                backgroundColor: lineFillColor2,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: pointBorderColor2,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5
            }
        ];
    }

    ngAfterViewInit() {

        // get the HTML for the legend after timeout - as expressions cannot be updated here
        setTimeout(() => {
            this.lineChartLegendContents = this.sanitizer.bypassSecurityTrustHtml(this.baseChart.chart.generateLegend());
        });
    }

    formatDate(date: number): string {
        return new Date(date).toLocaleDateString();
    }
}