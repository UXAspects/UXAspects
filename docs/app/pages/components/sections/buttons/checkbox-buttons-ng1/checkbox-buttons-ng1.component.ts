import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-checkbox-buttons-ng1',
    templateUrl: './checkbox-buttons-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsCheckboxButtonsNg1Component')
export class ComponentsCheckboxButtonsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.raw.checkboxButtonsHtml,
        htmlAttributes: {
            'ng-controller': 'CheckboxButtonsCtrl as vm'
        },
        js: [this.snippets.raw.checkboxButtonsJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
