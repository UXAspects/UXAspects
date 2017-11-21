import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-multiple-select-table-ng1',
    templateUrl: './multiple-select-table-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
@DocumentationSectionComponent('ComponentsMultipleSelectTableNg1Component')
export class ComponentsMultipleSelectTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codeSnippet = '{ id: 1, name: "Eric Carpenter" }';

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'MultipleSelectTableCtrl as vm'
        },
        js: [this.snippets.raw.sampleFullJs]
    };

}