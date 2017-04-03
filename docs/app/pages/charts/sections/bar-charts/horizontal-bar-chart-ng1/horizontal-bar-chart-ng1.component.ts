import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-charts-horizontal-bar-chart-ng1',
    templateUrl: './horizontal-bar-chart-ng1.component.html'
})
@DocumentationSectionComponent('ChartsHorizontalBarChartNg1Component')
export class ChartsHorizontalBarChartNg1Component implements ICodePenProvider {

    private data: any;
    private options: any;

    private htmlCode = require('./snippets/chart.html');
    private jsCode = require('./snippets/chart.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'HorizontalBarChartCtrl as bc'
        },
        js: [this.jsCode],
    };

    constructor(colorService: ColorService) {

        this.data = [{
            label: 'bar',
            data: [
                [34, 1],
                [25, 2],
                [19, 3],
                [34, 4],
                [32, 5],
                [44, 6]
            ]
        }];

        this.options = {
            series: {
                bars: {
                    show: true,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.1
                        }]
                    },
                    barWidth: 0.5,
                    lineWidth: 1,
                    horizontal: true,
                    align: 'center'
                },
                highlightColor: [colorService.getColor('chart1').setAlpha(0.2).toRgba()],
                valueLabels: {
                    show: true,
                    valign: 'top',
                    plotAxis: 'y',
                    xoffset: -30,
                    yoffset: -5,
                    font: '13px \'Source Sans Pro\'',
                    fontcolor: '#545454',
                    labelFormatter: function (v: string) {
                        var ticks = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt'];
                        return ticks[parseInt(v) - 1];
                    }
                }
            },
            xaxis: {
                tickDecimals: 0,
                color: [colorService.getColor('secondary').toHex()]
            },
            yaxis: {
                ticks: []
            },
            colors: [colorService.getColor('chart1').toRgb()],
            grid: {
                color: ['#999'],
                hoverable: true,
                clickable: true,
                borderWidth: {
                    left: 1,
                    bottom: 1,
                    right: 0,
                    top: 0
                },
                borderColor: {
                    left: [colorService.getColor('grey1').setAlpha(0.2).toRgba()],
                    bottom: [colorService.getColor('grey1').setAlpha(0.2).toRgba()]
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -38
                },
                content: function (label: string, xval: string, yval: string) {
                    var ticks = ['.doc', '.ppt', '.pdf', '.xls', '.html', '.txt'];
                    return 'x: ' + xval + ', y: ' + ticks[parseInt(yval) - 1];
                }
            }
        };
    }

}