import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-charts-sankey-chart-ng1',
    templateUrl: './sankey-chart-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsSankeyChartNg1Component')
export class ChartsSankeyChartNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    resizeId: number = null;
    container: any = {};
    chart: any = {};
    data: any;
    options: any;

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.chartHtml,
        htmlAttributes: {
            'ng-controller': 'SankeyCtrl as vm'
        },
        js: [this.snippets.raw.chartJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));

        this.data = {
            columns: [
                { id: 'data_source', name: 'Repository', ordinal: 0 },
                { id: 'extraction_type', name: 'Extraction', ordinal: 1 },
                { id: 'classification', name: 'Classification', ordinal: 2 },
                { id: 'disposition_type', name: 'Disposition', ordinal: 3 }
            ],
            nodes: [
                { name: 'Not Classified', type: 'classification', id: 0, value: 130, datasize: 362969649 },
                { name: 'Classified', type: 'classification', id: 1, value: 243, datasize: 326502171 },
                { name: 'Phone Records', type: 'data_source', id: 2, value: 14, datasize: 512125362 },
                { name: 'Lync Conversation', type: 'data_source', id: 3, value: 32, datasize: 62160 },
                { name: 'Device Backup', type: 'data_source', id: 4, value: 50, datasize: 33409254 },
                { name: 'Data Archive (Internal)', type: 'data_source', id: 5, value: 104, datasize: 35125228 },
                { name: 'Exchange', type: 'data_source', id: 6, value: 173, datasize: 108749816 },
                { name: 'Archived', type: 'disposition_type', id: 7, value: 12, datasize: 14860510 },
                { name: 'Deleted', type: 'disposition_type', id: 8, value: 34, datasize: 32517566 },
                { name: 'On Hold', type: 'disposition_type', id: 9, value: 68, datasize: 535140573 },
                { name: 'Image', type: 'extraction_type', id: 10, value: 16, datasize: 2286386 },
                { name: 'Audio', type: 'extraction_type', id: 11, value: 22, datasize: 525843218 },
                { name: 'Text', type: 'extraction_type', id: 12, value: 335, datasize: 161342216 }
            ],
            links: [
                { source: 0, target: 7, value: 4, datasize: 348 },
                { source: 0, target: 8, value: 4, datasize: 23572 },
                { source: 1, target: 7, value: 8, datasize: 14860162 },
                { source: 1, target: 9, value: 27, datasize: 217971281 },
                { source: 1, target: 8, value: 30, datasize: 32493994 },
                { source: 0, target: 9, value: 41, datasize: 317169292 },
                { source: 5, target: 11, value: 4, datasize: 6741424 },
                { source: 6, target: 11, value: 4, datasize: 6976432 },
                { source: 5, target: 10, value: 6, datasize: 73059 },
                { source: 6, target: 10, value: 10, datasize: 2213327 },
                { source: 2, target: 11, value: 14, datasize: 512125362 },
                { source: 3, target: 12, value: 32, datasize: 62160 },
                { source: 4, target: 12, value: 50, datasize: 33409254 },
                { source: 5, target: 12, value: 94, datasize: 28310745 },
                { source: 6, target: 12, value: 159, datasize: 99560057 },
                { source: 11, target: 1, value: 4, datasize: 187339593 },
                { source: 10, target: 0, value: 6, datasize: 226298 },
                { source: 10, target: 1, value: 10, datasize: 2060088 },
                { source: 11, target: 0, value: 18, datasize: 338503625 },
                { source: 12, target: 0, value: 105, datasize: 24239726 },
                { source: 12, target: 1, value: 230, datasize: 137102490 }
            ]
        };

        this.options = {
            linkHoverHL: true,
            col: {
                headerLabelSpacing: 25,
                paddingTop: 0,
                paddingBottom: 0,
                headerLabelLength: 18
            },
            block: {
                truncateThreshold: 18,
                minWidth: 120,
                calloutData: {
                    topLeft: { key: 'datasize', nodeLabel: false, defaultShow: false, valueUnit: 'B', label: 'data', binary: true, click: this.clickTopLeft },
                    topRight: { key: 'value', nodeLabel: false, defaultShow: true, valueUnit: null, label: 'items' },
                    bottomRight: {},
                    bottomLeft: { key: 'name', nodeLabel: true, defaultShow: true }
                }
            },
            overflow: {
                tooltip: {
                    label: 'items',
                    showTooltip: true
                }
            }
        };
    }

    click() {
    }

    clickTopLeft() {
    }

}