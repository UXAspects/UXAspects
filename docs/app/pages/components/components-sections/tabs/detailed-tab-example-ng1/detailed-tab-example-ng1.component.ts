import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-detailed-tab-example-ng1',
    templateUrl: './detailed-tab-example-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDetailedTabExampleNg1Component')
export class ComponentsDetailedTabExampleNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    barHtml = require('./wrapper/tab-bar.html');
    sankeyHtml = require('./wrapper/tab-sankey.html');
    tableHtml = require('./wrapper/tab-table.html');

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'TabsCtrl as vm'
        },
        htmlTemplates: [
            {
                id: 'tab-bar.html',
                content: this.barHtml
            },
            {
                id: 'tab-sankey.html',
                content: this.sankeyHtml
            },
            {
                id: 'tab-table.html',
                content: this.tableHtml
            }
        ],
        js: [this.snippets.raw.sampleJs, this.snippets.raw.tabBarJs, this.snippets.raw.tabSankeyJs, this.snippets.raw.tabTableJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}