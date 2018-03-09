import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '@ux-aspects/ux-aspects';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-horizontal-bar-chart',
    templateUrl: './horizontal-bar-chart.component.html'
})
@DocumentationSectionComponent('ChartsHorizontalBarChartComponent')
export class ChartsHorizontalBarChartComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
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
    barChartData: Chart.ChartDataSets[] = [{
        data: [44, 32, 34, 19, 25, 34],
        borderWidth: 1
    }];

    barChartLabels: string[] = ['.txt', '.html', '.xls', '.pdf', '.ppt', '.doc'];
    barChartOptions: Chart.ChartOptions;
    barChartLegend: boolean = false;
    barChartColors: any;

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let borderColor = colorService.getColor('grey2').setAlpha(0.5).toRgba();
        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();
        let barBackgroundColor = colorService.getColor('chart1').setAlpha(0.1).toRgba();
        let barHoverBackgroundColor = colorService.getColor('chart1').setAlpha(0.2).toRgba();
        let barBorderColor = colorService.getColor('chart1').toHex();

        this.barChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'transparent'
                    },
                    ticks: {
                        min: 0,
                        max: 45,
                        stepSize: 5
                    } as Chart.LinearTickOptions
                }],
                yAxes: [{
                    barPercentage: 0.5,
                    categoryPercentage: 1,
                    gridLines: {
                        color: 'transparent'
                    }
                } as Chart.ChartXAxe]
            },
            tooltips: {
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem) => {
                        return `x: ${ item.xLabel }, y: ${ item.yLabel }`;
                    }
                },
                displayColors: false
            } as any
        };

        this.barChartColors = [{
            backgroundColor: barBackgroundColor,
            hoverBackgroundColor: barHoverBackgroundColor,
            borderColor: barBorderColor
        }];

    }

}