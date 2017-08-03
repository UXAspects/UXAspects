import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ColorService } from '../../../../../../../src/index';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-donut-chart-ng1',
    templateUrl: './donut-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsDonutChartNg1Component')
export class ChartsDonutChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    data: any;
    options: any;

    codepen: ICodePen = {
        html: this.snippets.raw.chartHtml,
        htmlAttributes: {
            'ng-controller': 'DonutChartCtrl as dc'
        },
        js: [this.snippets.raw.chartJs]
    };

    constructor(private colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let flotChartColors = {
            chartColor1: colorService.getColor('chart1').toRgb(),
            chartColor2: colorService.getColor('chart2').toRgb(),
            chartColor3: colorService.getColor('chart3').toRgb(),
            chartColor4: colorService.getColor('chart4').toRgb(),
            chartColor5: colorService.getColor('chart5').toRgb(),
            chartHover1: colorService.getColor('chart1').setAlpha(0.2).toRgba(),
            chartHover2: colorService.getColor('chart2').setAlpha(0.3).toRgba(),
            chartHover3: colorService.getColor('chart3').setAlpha(0.3).toRgba(),
            chartHover4: colorService.getColor('chart4').setAlpha(0.3).toRgba(),
            chartHover5: colorService.getColor('chart5').setAlpha(0.3).toRgba(),
            gridColor: colorService.getColor('grey4').toHex(),
            labelColor: colorService.getColor('grey2').toHex()
        };

        this.data = [{
            label: 'Sales 1',
            data: 25,
            color: [flotChartColors.chartColor1],
            highlightColor: [flotChartColors.chartHover1]
        }, {
            label: 'Sales 2',
            data: 15,
            color: [flotChartColors.chartColor2],
            highlightColor: [flotChartColors.chartHover2]
        }, {
            label: 'Sales 3',
            data: 18,
            color: [flotChartColors.chartColor3],
            highlightColor: [flotChartColors.chartHover3]
        }, {
            label: 'Sales 4',
            data: 20,
            color: [flotChartColors.chartColor4],
            highlightColor: [flotChartColors.chartHover4]
        }, {
            label: 'Sales 5',
            data: 10,
            color: [flotChartColors.chartColor5],
            highlightColor: [flotChartColors.chartHover5]
        }];

        this.options = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.7,
                    centerLabel: {
                        show: true,
                        color: flotChartColors.gridColor,
                        text: '65%',
                        font: 'Source Sans Pro',
                        fontSize: 18,
                        paddingX: 4,
                        paddingY: 0,
                        textBaseline: 'bottom'
                    },
                    subLabel: {
                        show: true,
                        color: flotChartColors.chartColor1,
                        text: 'Sales',
                        font: 'Source Sans Pro',
                        fontSize: 22,
                        paddingX: 1,
                        paddingY: 10,
                        textBaseline: 'middle'
                    },
                    donutLabel: {
                        show: true,
                        color: flotChartColors.labelColor,
                        text: 'Proprietary',
                        font: 'Source Sans Pro',
                        fontSize: 20
                    },
                    stroke: {
                        width: 0
                    }
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -30
                },
                content: '%p.0%, %s'
            },
            legend: {
                show: true,
                backgroundColor: 'transparent',
                labelFormatter: function (label: string) {
                    return '<span class="legend-styling">' + label + '</span>';
                },
                labelBoxBorderColor: 'transparent'
            }
        };
    }

    onPlotClick() {
        // Code to be executed when plot is clicked.
    }

    onPlotHover() {
        // Code to be executed when plot area is hovered.
    }
}