import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-charts-nested-donut-chart-ng1',
    templateUrl: './nested-donut-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsNestedDonutChartNg1Component')
export class ChartsNestedDonutChartNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    data: any[];
    options: any;

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.chartHtml,
        js: [this.snippets.raw.chartJs],
        css: [this.snippets.raw.chartCss],
        htmlAttributes: {
            'ng-controller': 'NestedDonutChartCtrl as dc'
        }
    });

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        this.data = [{
            label: 'documents',
            color: colorService.getColor('chart1').toHex(),
            value: 23456
        }, {
            label: 'reviewed',
            color: colorService.getColor('chart2').toHex(),
            value: 19876
        }, {
            label: 'produced',
            color: colorService.getColor('chart3').toHex(),
            value: 11123
        }];

        this.options = {
            size: 100,
            donutWidth: 4,
            donutSpacing: 4,
            hoverAnimation: true,
            onHover: function () {
                // perform any actions here on hover
            },
            onClick: function () {
                // perform any actions here on hover
            },
            tooltip: {
                show: true,
                content: function (data: any) {
                    return '<div style="display: inline-block; width: 10px; height: 10px; margin-right: 2px; background-color: ' + data.color + '"></div> <b>' + data.value + '</b> ' + data.label;
                },
                shifts: {
                    x: 0,
                    y: 0
                }
            }
        };
    }
}