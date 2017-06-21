import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-forms-form-validation-on-submit',
    templateUrl: './form-validation-on-submit.component.html'
})
@DocumentationSectionComponent('CssFormValidationOnSubmitComponent')
export class CssFormValidationOnSubmitComponent extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
        js: [this.snippets.examples.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}