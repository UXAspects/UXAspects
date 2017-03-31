import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-detailed-tab-example-ng1',
    templateUrl: './detailed-tab-example-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDetailedTabExampleNg1Component')
export class ComponentsDetailedTabExampleNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');
    private barHtml = require('./wrapper/tab-bar.html');
    private barCtrl = require('./snippets/tab-bar.js');
    private sankeyHtml = require('./wrapper/tab-sankey.html');
    private sankeyCtrl = require('./snippets/tab-sankey.js');
    private tableHtml = require('./wrapper/tab-table.html');
    private tableCtrl = require('./snippets/tab-table.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
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
        js: [this.jsCode, this.barCtrl, this.sankeyCtrl, this.tableCtrl]
    };
    
}