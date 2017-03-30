import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-forms-form-validation-field-by-field',
    templateUrl: './form-validation-field-by-field.component.html'
})
@DocumentationSectionComponent('CssFormValidationFieldByFieldComponent')
export class CssFormValidationFieldByFieldComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };

}