import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-detailed-tab-example-ng1',
    templateUrl: './detailed-tab-example-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDetailedTabExampleNg1Component')
export class ComponentsDetailedTabExampleNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    // private htmlCode = require('./snippets/sample.html');
    // private jsCode = require('./snippets/sample.js');
    // private barCtrl = require('./snippets/tab-bar.js');
    // private sankeyCtrl = require('./snippets/tab-sankey.js');
    // private tableCtrl = require('./snippets/tab-table.js');

    private barHtml = require('./wrapper/tab-bar.html');
    private sankeyHtml = require('./wrapper/tab-sankey.html');
    private tableHtml = require('./wrapper/tab-table.html');

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
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
        js: [this.snippets.examples.sampleJs, this.snippets.examples.tabBarJs, this.snippets.examples.tabSankeyJs, this.snippets.examples.tabTableJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
    
}