import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-line-chart-ng1',
    templateUrl: './line-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsLineChartNg1Component')
export class ChartsLineChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    data: any;
    options: any;

    codepen: ICodePen = {
        html: this.snippets.raw.chartHtml,
        htmlAttributes: {
            'ng-controller': 'LineChartCtrl as lc'
        },
        js: [this.snippets.raw.chartJs]
    };

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let flotChartColors = {
            chartColor: colorService.getColor('chart1').toRgb(),
            chartForecast: colorService.getColor('chart1').setAlpha(0.06).toRgba(),
            gridColor: colorService.getColor('grey4').toHex(),
            tickColor: colorService.getColor('grey6').toHex(),
            borderColor: colorService.getColor('grey2').setAlpha(0.5).toRgba()
        };

        this.data = [{
            label: 'line',
            data: [
                [1, 34],
                [2, 25],
                [3, 19],
                [4, 34],
                [5, 32],
                [6, 44]
            ],
            forecastData: [
                [7, 45],
                [8, 50],
                [9, 55]
            ]
        }];

        this.options = {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.1
                        }]
                    }
                },
                shadowSize: 0,
                highlightColor: [flotChartColors.chartColor],
                forecastFillColor: [flotChartColors.chartForecast],
                forecastColor: [flotChartColors.chartColor],
                forecastDashStyle: [5]
            },
            xaxis: {
                tickDecimals: 0
            },
            colors: [flotChartColors.chartColor],
            grid: {
                color: [flotChartColors.gridColor],
                hoverable: true,
                clickable: true,
                tickColor: [flotChartColors.tickColor],
                borderWidth: {
                    'left': 1,
                    'bottom': 1,
                    'right': 0,
                    'top': 0
                },
                borderColor: {
                    'left': [flotChartColors.borderColor],
                    'bottom': [flotChartColors.borderColor]
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: 'x: %x, y: %y'
            }
        };
    }
}