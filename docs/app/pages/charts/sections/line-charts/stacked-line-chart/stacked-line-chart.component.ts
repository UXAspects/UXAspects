import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-charts-stacked-line-chart',
    templateUrl: './stacked-line-chart.component.html'
})
@DocumentationSectionComponent('ChartsStackedLineChartComponent')
export class ChartsStackedLineChartComponent implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/line-chart.ts'),
            'app.component.html': require('./snippets/line-chart.html'),
            'app.component.css': require('./snippets/line-chart.css')
        },
        modules: [{
            library: 'chart.js'
        },
        {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule'],
            library: 'ux-aspects'
        }],
        mappings: [
            {
                alias: 'chart.js',
                source: 'https://unpkg.com/chart.js@2.5.0/dist/Chart.min.js'
            },
            {
                alias: 'ng2-charts',
                source: 'https://unpkg.com/ng2-charts@1.5.0/bundles/ng2-charts.umd.min.js'
            }
        ]
    };

    // configure the directive data
    lineChartData: Chart.ChartData;

    lineChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    lineChartOptions: Chart.ChartOptions;
    lineChartLegend: boolean = false;
    lineChartColors: any;

    htmlCode = require('./snippets/line-chart.html');
    tsCode = require('./snippets/line-chart.ts');
    cssCode = require('./snippets/line-chart.css');

    constructor(colorService: ColorService) {

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        let lineBorderColor1 = colorService.getColor('chart1').toRgb();
        let lineFillColor1 = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        let lineForecastFillColor1 = colorService.getColor('chart1').setAlpha(0.06).toRgba();
        let pointBorderColor1 = colorService.getColor('chart1').setAlpha(0.5).toRgba();

        let lineBorderColor2 = colorService.getColor('chart2').toRgb();
        let lineFillColor2 = colorService.getColor('chart2').setAlpha(0.1).toRgba();
        let lineForecastFillColor2 = colorService.getColor('chart2').setAlpha(0.06).toRgba();
        let pointBorderColor2 = colorService.getColor('chart2').setAlpha(0.5).toRgba();

        let lineBorderColor3 = colorService.getColor('chart3').toRgb();
        let lineFillColor3 = colorService.getColor('chart3').setAlpha(0.1).toRgba();
        let lineForecastFillColor3 = colorService.getColor('chart3').setAlpha(0.06).toRgba();
        let pointBorderColor3 = colorService.getColor('chart3').setAlpha(0.5).toRgba();

        this.lineChartData = [{
            data: this.getRandomData(),
            borderWidth: 1
        },
        {
            data: this.getRandomData(),
            borderWidth: 1
        },
        {
            data: this.getRandomData(),
            borderWidth: 1
        }];

        this.lineChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            hover: {
                mode: 'nearest'
            },
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                ticks: {
                    min: 0,
                    max: 25000
                },
                yAxes: [{
                    stacked: true,
                    ticks: {
                        min: 0,
                        max: 30000,
                        stepSize: 5000,
                        callback: value => `${ value }€`
                    } as Chart.LinearTickOptions
                }]
            },
            tooltips: {
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem) => `Sales ${ item.datasetIndex + 1 } - ${ item.yLabel }€ in cycle ${ item.index + 1 }`
                },
                displayColors: false
            } as any
        };

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
            },
            {
                borderColor: lineBorderColor3,
                backgroundColor: lineFillColor3,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBorderColor: pointBorderColor3,
                pointHoverBorderWidth: 3,
                pointHoverRadius: 5,
                pointHitRadius: 5
            }
        ];
    }

    getRandomData(): number[] {
        let data: number[] = [];

        for (let idx = 0; idx < 13; idx++) {
            data.push(Math.floor(Math.random() * 10000));
        }

        return data;
    }

}