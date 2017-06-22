import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { DashboardOptions } from '../../../../../../../src/components/dashboard/index';
import { ColorService } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';
import 'chance';

@Component({
    selector: 'uxd-components-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
@DocumentationSectionComponent('ComponentsDashboardComponent')
export class ComponentsDashboardComponent extends BaseDocumentationSection implements IPlunkProvider {

    // configure the directive data
    lineChartData: Chart.ChartData = [{
        data: [],
        borderWidth: 2,
        fill: false
    },
    {
        data: [],
        borderWidth: 2,
        fill: false
    }];

    lineChartOptions: Chart.ChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: 'transparent'
                },
                ticks: {
                    min: 0,
                    max: 49,
                    maxRotation: 0
                } as Chart.LinearTickOptions
            }],
            yAxes: [{
                gridLines: {
                    color: '#ddd'
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 100
                } as Chart.LinearTickOptions,
            }]
        },
    };

    lineChartLabels: string[] = [];
    lineChartLegend: boolean = false;
    lineChartColors = [
        {
            borderColor: this.colorService.getColor('vibrant1').toHex(),
        },
        {
            borderColor: this.colorService.getColor('vibrant2').toHex(),
        }];

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        mappings: [
            MAPPINGS.Chance,
            MAPPINGS.ChartJs,
            MAPPINGS.Ng2Charts
        ],
        modules: [{
            imports: ['DashboardModule', 'ColorServiceModule', 'SparkModule'],
            library: 'ux-aspects'
        }, {
            library: 'chance'
        },
        {
            library: 'chart.js'
        },
        {
            imports: ['ChartsModule'],
            library: 'ng2-charts'
        }]
    };

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // generate the chart data
        for (let idx = 0; idx < 50; idx++) {

            let label = '';

            if (idx === 0) {
                label = 'Jan 1, 2017';
            }

            if (idx === 49) {
                label = 'Mar 30, 2017';
            }

            this.lineChartLabels.push(label);

            this.lineChartData[0].data.push({
                x: idx,
                y: chance.integer({ min: 280, max: 460 })
            });

            this.lineChartData[1].data.push({
                x: idx,
                y: chance.integer({ min: 50, max: 250 })
            });
        }
    }

}