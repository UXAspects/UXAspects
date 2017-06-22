import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-charts-peity-charts-ng1',
    templateUrl: './peity-charts-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsPeityChartNg1Component')
export class ChartsPeityChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    private lineChart: any;
    private updatingLineChart: any;
    private barChart: any;

    public codepen: ICodePen = {
        html: this.snippets.examples.chartHtml,
        htmlAttributes: {
            'ng-controller': 'PeityChartCtrl as pc'
        },
        js: [this.snippets.examples.chartJs],
    };

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let peityChartColors = {
            chartColor1: colorService.getColor('chart1').toRgb(),
            chartColor2: colorService.getColor('chart2').toRgb(),
            chartFill1: colorService.getColor('chart1').setAlpha(0.2).toRgba()
        };

        this.lineChart = {
            data_1: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
            data_2: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
            data_3: [0, -3, -6, -4, -5, -4, -7, -3, -5, -2],
            options: {
                fill: [peityChartColors.chartFill1],
                stroke: [peityChartColors.chartColor1]
            }
        };

        this.updatingLineChart = {
            data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
            options: {
                fill: [peityChartColors.chartFill1],
                stroke: [peityChartColors.chartColor1],
                width: 64
            },
            method: function (oldData: number[]) {

                // START - write code here.. that updates the old value to update the chart.
                var random = Math.round(Math.random() * 10);
                var newData = oldData;
                newData.shift();
                newData.push(random);

                // return the newData to update the chart.
                return newData;
            },
            updateinterval: 300
        };

        this.barChart = {
            data_1: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
            data_2: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
            options: {
                fill: [
                    [peityChartColors.chartColor1],
                    [peityChartColors.chartColor2]
                ]
            }
        };
    }
}