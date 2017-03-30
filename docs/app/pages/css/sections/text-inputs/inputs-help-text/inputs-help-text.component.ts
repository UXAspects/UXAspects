import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';


@Component({
    selector: 'uxd-css-text-inputs-inputs-help-text',
    templateUrl: './inputs-help-text.component.html'
})
@DocumentationSectionComponent('CssInputsHelpTextComponent')
export class CssInputsHelpTextComponent implements ICodePenProvider {

    private htmlCode  = require('./snippets/sample.html');

    private htmlCodeAdvanced = require('./snippets/sample-advanced.html');

    private codepenSnippet  = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };

}