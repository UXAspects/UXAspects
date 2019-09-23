import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-charts-stacked-line-chart',
    templateUrl: './stacked-line-chart.component.html'
})
@DocumentationSectionComponent('ChartsStackedLineChartComponent')
export class ChartsStackedLineChartComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.lineChartTs,
            'app.component.html': this.snippets.raw.lineChartHtml,
            'app.component.css': this.snippets.raw.lineChartCss
        },
        modules: [{
            library: 'chart.js'
        },
        {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }, {
            imports: ['ColorServiceModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    // configure the directive data
    lineChartData: Chart.ChartDataSets[];

    lineChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    lineChartOptions: Chart.ChartOptions;
    lineChartLegend: boolean = false;
    lineChartColors: any;

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

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