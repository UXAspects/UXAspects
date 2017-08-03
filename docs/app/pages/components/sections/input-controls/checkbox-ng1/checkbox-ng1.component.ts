import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-checkbox-ng1',
    templateUrl: './checkbox-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsCheckboxNg1Component')
export class ComponentsCheckboxNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'CheckboxDemoCtrl as vm'
        },
        js: [this.snippets.raw.sampleJs]
    };

}