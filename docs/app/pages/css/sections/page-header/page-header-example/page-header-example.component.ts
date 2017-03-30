import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-page-header-page-header-example',
    templateUrl: './page-header-example.component.html'
})
@DocumentationSectionComponent('CssPageHeaderExampleComponent')
export class CssPageHeaderExampleComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');
    private cssCode = require('./snippets/sample.css');

    public codepen: ICodePen = {
        html: this.htmlCode,
        css: [this.cssCode],
        js: [this.jsCode]
    };

}