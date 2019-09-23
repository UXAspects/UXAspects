import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-charts-live-chart-ng1',
    templateUrl: './live-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsLiveChartNg1Component')
export class ChartsLiveChartNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    series: any;
    options: any;
    livedata: any[] = [];

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.chartHtml,
        htmlAttributes: {
            'ng-controller': 'LiveChartCtrl as lc'
        },
        js: [this.snippets.raw.chartJs]
    });

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        let flotChartColors = {
            primary: colorService.getColor('chart1').toRgb(),
            gridColor: colorService.getColor('grey4').toHex(),
            tickColor: colorService.getColor('grey6').toHex(),
            borderColor: colorService.getColor('grey2').setAlpha(0.5).toRgba(),
            white: '#FFFFFF'
        };

        this.series = [{
            data: this.getRandomData(),
            lines: {
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.1
                    }, {
                        opacity: 0.1
                    }]
                }
            },
            shadowSize: 0
        }];

        this.options = {
            grid: {
                color: [flotChartColors.gridColor],
                tickColor: [flotChartColors.tickColor],
                borderWidth: {
                    'top': 0,
                    'bottom': 1,
                    'left': 1,
                    'right': 0
                },
                borderColor: {
                    'bottom': [flotChartColors.borderColor],
                    'left': [flotChartColors.borderColor]
                },
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: [
                        [flotChartColors.white],
                        [flotChartColors.white]
                    ]
                },
                margin: {
                    top: 8,
                    bottom: 20,
                    left: 20
                },
                markings: function (axes: any) {
                    var markings = [];
                    var xaxis = axes.xaxis;
                    for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                        markings.push({
                            xaxis: {
                                from: x,
                                to: x + xaxis.tickSize
                            },
                            color: [flotChartColors.white]
                        });
                    }
                    return markings;
                }
            },
            colors: [flotChartColors.primary],
            xaxis: {
                tickFormatter: function () {
                    return '';
                }
            },
            yaxis: {
                min: 0,
                max: 110
            },
            legend: {
                show: true
            }
        };

        // update the chart every 40ms
        setInterval(() => {
            this.series[0].data = this.getRandomData();
        }, 40);
    }

    getRandomData() {

        if (this.livedata.length) {
            this.livedata = this.livedata.slice(1);
        }

        while (this.livedata.length < 300) {
            var previous = this.livedata.length ? this.livedata[this.livedata.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            this.livedata.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }

        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < this.livedata.length; ++i) {
            res.push([i, this.livedata[i]]);
        }

        return res;
    }
}