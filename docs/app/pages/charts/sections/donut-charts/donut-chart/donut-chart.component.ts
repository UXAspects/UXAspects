import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-donut-chart',
    templateUrl: './donut-chart.component.html'
})
@DocumentationSectionComponent('ChartsDonutChartComponent')
export class ChartsDonutChartComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.examples.appTs,
            'app.component.html': this.snippets.examples.appHtml,
            'app.component.css': this.snippets.examples.appCss
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
    donutChartData: Chart.ChartData = [{
        data: [25, 15, 18, 20, 10],
        borderWidth: 0
    }];

    donutChartLabels: string[] = ['Sales 1', 'Sales 2', 'Sales 3', 'Sales 4', 'Sales 5'];
    donutChartOptions: Chart.ChartOptions;
    donutChartLegend: boolean = true;
    donutChartColors: any;

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.donutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            cutoutPercentage: 70,
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 12
                }
            },
            tooltips: {
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem, data: any) => {

                        // get the dataset (we only have one)
                        let dataset = data.datasets[0];

                        // calculate the total of all segment values
                        let total = dataset.data.reduce((previousValue: any, currentValue: any) => {
                            return previousValue + currentValue;
                        });

                        // get the value of the current segment
                        let segmentValue = dataset.data[item.index];

                        // calculate the percentage of the current segment compared to the total
                        let precentage = Math.round(((segmentValue / total) * 100));

                        return `${precentage}%, Sales ${item.index + 1}`;
                    }
                },
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                displayColors: false
            } as any
        };

        this.donutChartColors = [
            {
                backgroundColor: [
                    colorService.getColor('chart1').toRgb(),
                    colorService.getColor('chart2').toRgb(),
                    colorService.getColor('chart3').toRgb(),
                    colorService.getColor('chart4').toRgb(),
                    colorService.getColor('chart5').toRgb()
                ],
                hoverBackgroundColor: [
                    colorService.getColor('chart1').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart2').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart3').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart4').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart5').setAlpha(0.3).toRgba()
                ]
            }
        ];
    }

}