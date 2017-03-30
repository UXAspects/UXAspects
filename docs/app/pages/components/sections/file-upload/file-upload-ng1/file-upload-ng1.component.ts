import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-components-file-upload-ng1',
    templateUrl: './file-upload-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFileUploadNg1Component')
export class ComponentsFileUploadNg1Component implements ICodePenProvider {
    
    private sampleCode = require('./snippets/sample.js');

    private htmlCode = require('./snippets/app.html');
    private jsCode = require('./snippets/app.js');
    private cssCode = require('./snippets/app.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        js: [this.jsCode],
        css: [this.cssCode]
    };

}