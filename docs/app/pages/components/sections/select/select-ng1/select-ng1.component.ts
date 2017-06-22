import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-select-ng1',
    templateUrl: './select-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSelectNg1Component')
export class ComponentsSelectNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'SelectDemoCtrl as vm'
        },
        js: [this.snippets.raw.sampleFullJs]
    };

}