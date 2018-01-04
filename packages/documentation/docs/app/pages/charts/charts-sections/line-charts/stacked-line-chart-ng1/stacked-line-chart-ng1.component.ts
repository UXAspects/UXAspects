import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '@ux-aspects/ux-aspects';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-stacked-line-chart-ng1',
    templateUrl: './stacked-line-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsStackedLineChartNg1Component')
export class ChartsStackedLineChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    data: any[];
    options: any;

    codepen: ICodePen = {
        html: this.snippets.raw.chartHtml,
        htmlAttributes: {
            'ng-controller': 'StackedLineChartCtrl as lc'
        },
        js: [this.snippets.raw.chartJs]
    };

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let flotChartColors = {
            chart1Color: colorService.getColor('chart1').toRgb(),
            chart2Color: colorService.getColor('chart2').toRgb(),
            chart3Color: colorService.getColor('chart3').toRgb(),
            chart1Fill: colorService.getColor('chart1').setAlpha(0.2).toRgba(),
            chart2Fill: colorService.getColor('chart2').setAlpha(0.2).toRgba(),
            chart3Fill: colorService.getColor('chart3').setAlpha(0.2).toRgba(),
            chart1Hover: colorService.getColor('chart1').setAlpha(0.3).toRgba(),
            chart2Hover: colorService.getColor('chart2').setAlpha(0.3).toRgba(),
            chart3Hover: colorService.getColor('chart3').setAlpha(0.3).toRgba(),
            chart1Forecast: colorService.getColor('chart1').setAlpha(0.06).toRgba(),
            chart2Forecast: colorService.getColor('chart2').setAlpha(0.06).toRgba(),
            chart3Forecast: colorService.getColor('chart3').setAlpha(0.06).toRgba(),
            gridColor: colorService.getColor('grey4').toHex(),
            tickColor: colorService.getColor('grey6').toHex(),
            borderColor: colorService.getColor('grey2').setAlpha(0.5).toRgba(),
        };

        let data1 = [], data2 = [], data3 = [], data4 = [], data5 = [], data6 = [];

        for (let i = 1; i <= 10; i += 1) {
            data1.push([i, Math.floor(Math.random() * 10000)]);
            data2.push([i, Math.floor(Math.random() * 10000)]);
            data3.push([i, Math.floor(Math.random() * 10000)]);
        }

        for (let i = 11; i <= 13; i += 1) {
            data4.push([i, Math.floor(Math.random() * 10000)]);
            data5.push([i, Math.floor(Math.random() * 10000)]);
            data6.push([i, Math.floor(Math.random() * 10000)]);
        }

        this.data = [{
            label: 'Sales 1',
            data: data1,
            color: [flotChartColors.chart1Color],
            fillColor: flotChartColors.chart1Fill,
            highlightColor: [flotChartColors.chart1Hover],
            shadowSize: 0,
            forecastData: data4,
            forecastFillColor: [flotChartColors.chart1Forecast],
            forecastColor: [flotChartColors.chart1Color],
            forecastHighLightColor: [flotChartColors.chart1Hover]
        }, {
            label: 'Sales 2',
            data: data2,
            color: [flotChartColors.chart2Color],
            fillColor: flotChartColors.chart2Fill,
            highlightColor: [flotChartColors.chart2Hover],
            shadowSize: 0,
            forecastData: data5,
            forecastFillColor: [flotChartColors.chart2Forecast],
            forecastColor: [flotChartColors.chart2Color],
            forecastDashStyle: [5],
            forecastHighLightColor: [flotChartColors.chart2Hover]
        }, {
            label: 'Sales 3',
            data: data3,
            color: [flotChartColors.chart3Color],
            fillColor: [flotChartColors.chart3Fill],
            highlightColor: [flotChartColors.chart3Hover],
            shadowSize: 0,
            forecastData: data6,
            forecastFillColor: [flotChartColors.chart3Forecast],
            forecastColor: [flotChartColors.chart3Color],
            forecastDashStyle: [5],
            forecastHighLightColor: [flotChartColors.chart3Hover]
        }];

        this.options = {
            series: {
                stack: true,
                lines: {
                    show: true,
                    fill: true
                }
            },
            yaxis: {
                tickFormatter: this.euroFormatter
            },
            xaxis: {
                tickDecimals: 0
            },
            grid: {
                color: [flotChartColors.gridColor],
                hoverable: true,
                clickable: true,
                tickcolor: [flotChartColors.tickColor],
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
                show: true,
                container: '#legendHolderLine',
                noColumns: 0
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: '%s - %y in cycle %x'
            }
        };
    }

    euroFormatter(v: number, axis: any) {
        return v.toFixed(axis.tickDecimals) + '€';
    }

}