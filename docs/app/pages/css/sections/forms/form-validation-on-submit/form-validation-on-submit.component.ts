import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-forms-form-validation-on-submit',
    templateUrl: './form-validation-on-submit.component.html'
})
@DocumentationSectionComponent('CssFormValidationOnSubmitComponent')
export class CssFormValidationOnSubmitComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        js: [this.jsCode]
    };

}