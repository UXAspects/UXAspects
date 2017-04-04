import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-charts-scrollable-chart-ng1',
    templateUrl: './scrollable-chart-ng1.component.html'
})
@DocumentationSectionComponent('ChartsScrollableChartNg1Component')
export class ChartsScrollableChartNg1Component {
    private data: any;
    private options: any;

    constructor(colorService: ColorService) {

        var flotChartColors = {
            chartColor: colorService.getColor('chart1').toRgb(),
            chartHover: colorService.getColor('chart2').setAlpha(0.2).toRgba(),
            gridColor: colorService.getColor('grey4').toHex(),
            tickColor: colorService.getColor('grey6').toHex(),
            borderColor: colorService.getColor('grey2').setAlpha().toRgba(),
            white: '#fff'
        };

        this.data = [{
            label: 'bar',
            data: [
                [1, 34],
                [2, 25],
                [3, 19],
                [4, 34],
                [5, 32],
                [6, 44],
                [7, 12],
                [8, 27],
                [9, 15],
                [10, 48],
                [11, 40],
                [12, 36]
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
                    align: 'center'
                },
                highlightColor: [flotChartColors.chartHover]
            },
            xaxis: {
                tickDecimals: 0,
                color: [flotChartColors.white],
                ticks: [
                    [1, '.doc'],
                    [2, '.ppt'],
                    [3, '.pdf'],
                    [4, '.xls'],
                    [5, '.html'],
                    [6, '.txt'],
                    [7, '.png'],
                    [8, '.bmp'],
                    [9, '.gif'],
                    [10, '.svg'],
                    [11, '.ttf'],
                    [12, '.wav']
                ],
                scrollable: {
                    enabled: true,
                    range: 4,
                    lowerBound: 0.5,
                    upperBound: 12.5,
                    color: [flotChartColors.chartColor],
                    callback: function () {
                        // do stuff in here when scrolled
                    }
                }
            },
            colors: [flotChartColors.chartColor],
            grid: {
                color: [flotChartColors.gridColor],
                hoverable: true,
                clickable: true,
                borderWidth: {
                    left: 1,
                    bottom: 1,
                    right: 0,
                    top: 0
                },
                borderColor: {
                    left: [flotChartColors.borderColor],
                    bottom: [flotChartColors.borderColor]
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -30
                },
                content: function (label: string, xval: string, yval: string) {
                    var content = 'x: ' + '%x' + ', y: ' + yval;
                    return content;
                }
            }
        };
    }
}