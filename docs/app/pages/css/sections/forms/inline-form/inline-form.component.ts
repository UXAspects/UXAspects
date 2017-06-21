import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-forms-inline-form',
    templateUrl: './inline-form.component.html'
})
@DocumentationSectionComponent('CssInlineFormComponent')
export class CssInlineFormComponent extends BaseDocumentationSection implements ICodePenProvider {

    checked: boolean = false;

    public codepen: ICodePen = {
        html: this.snippets.examples.codeExampleHtml
    };

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}