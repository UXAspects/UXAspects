import { Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ChartDataset, ChartOptions, TooltipItem } from 'chart.js';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-charts-horizontal-bar-chart',
    templateUrl: './horizontal-bar-chart.component.html'
})
@DocumentationSectionComponent('ChartsHorizontalBarChartComponent')
export class ChartsHorizontalBarChartComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
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

    barChartData: ChartDataset<'bar'>[];
    barChartLabels: string[] = ['.txt', '.html', '.xls', '.pdf', '.ppt', '.doc'];
    barChartOptions: ChartOptions<'bar'>;
    barChartLegend: boolean = false;
    barChartColors: any;

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        const tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        const barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        const barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
        const barBorderColor = colorService.getColor('chart1').toHex();

        // configure the directive data
        this.barChartData = [{
            data: [44, 32, 34, 19, 25, 34],
            borderWidth: 1,
            barPercentage: 0.5,
            categoryPercentage: 1,
            backgroundColor: barBackgroundColor,
            hoverBackgroundColor: barHoverBackgroundColor,
            borderColor: barBorderColor,
            hoverBorderColor: barBorderColor,
        }];

        this.barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    min: 0,
                    max: 45,
                    grid: {
                        color: 'transparent'
                    },
                    ticks: {
                        stepSize: 5
                    }
                },
                y: {
                    grid: {
                        color: 'transparent'
                    }
                }
            },
            indexAxis: 'y',
            plugins: {
                tooltip: {
                    backgroundColor: tooltipBackgroundColor,
                    cornerRadius: 0,
                    callbacks: {
                        title: (item: TooltipItem<'bar'>[]) => '',
                        label: (item: TooltipItem<'bar'>) => `x: ${item.label}, y: ${item.formattedValue}`
                    },
                    displayColors: false
                }
            }
        };
    }

}