import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-pdf-service-ng1',
    templateUrl: './pdf-service-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsPdfServiceNg1Component')
export class ComponentsPdfServiceNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');
    private snippet = require('./snippets/snippet.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'PdfServiceCtrl as vm'
        },
        js: [this.jsCode]
    };
    
}