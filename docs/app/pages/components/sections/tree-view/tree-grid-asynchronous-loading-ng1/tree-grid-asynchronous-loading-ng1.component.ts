import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-tree-grid-asynchronous-loading',
    templateUrl: './tree-grid-asynchronous-loading-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTreeGridAsynchronousLoadingNg1Component')
export class ComponentsTreeGridAsynchronousLoadingNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCodeShort = require('./snippets/sample-short.js');
    private jsCode = require('./snippets/sample.js');
    private template = require('./snippets/template.html');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'TreeGridAsyncDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'template.html',
            content: this.template
        }],
        js: [this.jsCode]
    };
    
}