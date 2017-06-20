import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-number-picker-ng1',
    templateUrl: './number-picker-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsNumberPickerNg1Component')
export class ComponentsNumberPickerNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'NumberPickerCtrl as vm'
        },
        js: [this.snippets.examples.sampleJs],
        css: [this.snippets.examples.sampleCss]
    };

}