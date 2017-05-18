import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ColorService } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-charts-spark-charts',
    templateUrl: './spark-charts.component.html'
})
@DocumentationSectionComponent('ChartsSparkChartsComponent')
export class ChartsSparkChartsComponent extends BaseDocumentationSection implements IPlunkProvider {

    charts: SparkChart[] = [
        {
            value: 35,
            barHeight: 10,
            topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
            tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
        },
        {
            barColor: this.colorService.getColor('chart3').toHex(),
            trackColor: this.colorService.getColor('chart3').setAlpha(0.2).toRgba(),
            value: 30,
            barHeight: 5,
            inlineLabel: '30%'
        },
        {
            barColor: this.colorService.getColor('chart2').toHex(),
            trackColor: this.colorService.getColor('chart2').setAlpha(0.2).toRgba(),
            value: 35,
            barHeight: 10,
            topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
            bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">INDEX COVERAGE</span></span>',
            tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
        },
        {
            barColor: this.colorService.getColor('chart3').toHex(),
            trackColor: this.colorService.getColor('chart3').setAlpha(0.2).toRgba(),
            value: 30,
            barHeight: 5,
            inlineLabel: '<span class="spark-label hidden-spark"><span class="x-large">30%</span></span>',
            topLeftLabel: '<span class="spark-label hidden-xxs"><span class="small">STORAGE ON HOLD</span></span>'
        },
        {
            barColor: this.colorService.getColor('chart4').toHex(),
            trackColor: this.colorService.getColor('chart4').setAlpha(0.2).toRgba(),
            value: 55,
            barHeight: 10,
            topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
        },
        {
            barColor: this.colorService.getColor('chart5').toHex(),
            trackColor: this.colorService.getColor('chart5').setAlpha(0.2).toRgba(),
            value: 30,
            barHeight: 10,
            topLeftLabel: '30%',
            topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
            bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
            bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
        },
        {
            barColor: this.colorService.getColor('vibrant1').toHex(),
            trackColor: this.colorService.getColor('vibrant1').setAlpha(0.2).toRgba(),
            value: 55,
            barHeight: 10,
            topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
        },
        {
            barColor: this.colorService.getColor('vibrant2').toHex(),
            trackColor: this.colorService.getColor('vibrant2').setAlpha(0.2).toRgba(),
            value: 30,
            barHeight: 10,
            topLeftLabel: '30%',
            bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
            topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
            bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
        }
    ];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.compiled.appHtml,
            'app.component.ts': this.snippets.compiled.appTs
        },
        modules: [{
            imports: ['SparkModule', 'ColorServiceModule'],
            library: 'ux-aspects'
        }]
    };

    constructor(private colorService: ColorService) {
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }

}

interface SparkChart {
    value: number;
    barColor?: string;
    trackColor?: string;
    barHeight?: number;
    topLeftLabel?: string;
    topRightLabel?: string;
    bottomLeftLabel?: string;
    bottomRightLabel?: string;
    inlineLabel?: string;
    tooltip?: string;
}