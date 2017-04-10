import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '../../../../../../../src/index';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-charts-nested-donut-chart',
    templateUrl: './nested-donut-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsNestedDonutChartNg1Component')
export class ChartsNestedDonutChartNg1Component implements ICodePenProvider {

    private data: any[];
    private options: any;

    private htmlCode = require('./snippets/chart.html');
    private jsCode = require('./snippets/chart.js');
    private cssCode = require('./snippets/chart.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        js: [this.jsCode],
        css: [this.cssCode],
        htmlAttributes: {
            'ng-controller': 'NestedDonutChartCtrl as dc'
        }
    };

    constructor(colorService: ColorService) {

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