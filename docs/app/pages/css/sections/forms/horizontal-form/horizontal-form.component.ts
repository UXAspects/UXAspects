import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-forms-horizontal-form',
    templateUrl: './horizontal-form.component.html'
})
@DocumentationSectionComponent('CssHorizontalFormComponent')
export class CssHorizontalFormComponent implements ICodePenProvider {

    private htmlCode1 = require('./snippets/sample1.html');

    private htmlCode2 = require('./snippets/sample2.html');

    private htmlCode3 = require('./snippets/sample3.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };

}