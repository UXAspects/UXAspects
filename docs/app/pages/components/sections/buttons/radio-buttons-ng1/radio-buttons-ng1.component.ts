import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-radio-buttons-ng1',
    templateUrl: './radio-buttons-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsRadioButtonsNg1Component')
export class ComponentsRadioButtonsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.radioButtonsHtml,
        htmlAttributes: {
            'ng-controller': 'RadioButtonsCtrl as vm'
        },
        js: [this.snippets.examples.radioButtonsJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
