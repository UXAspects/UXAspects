import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-tags-ng1',
    templateUrl: './tags-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTagsNg1Component')
export class ComponentsTagsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    public codepen: ICodePen = {
        html: this.snippets.examples.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'TagsCtrl as vm'
        },
        js: [this.snippets.examples.codepenJs]
    };

}