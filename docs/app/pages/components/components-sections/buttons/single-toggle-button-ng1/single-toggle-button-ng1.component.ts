import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-single-toggle-button-ng1',
    templateUrl: './single-toggle-button-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsSingleToggleButtonNg1Component')
export class ComponentsSingleToggleButtonNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.singleToggleButtonHtml,
        htmlAttributes: {
            'ng-controller': 'SingleToggleButtonCtrl as vm'
        },
        js: [this.snippets.raw.singleToggleButtonJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
