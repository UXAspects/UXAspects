import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-pagination-ng1',
    templateUrl: './pagination-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsPaginationNg1Component')
export class ComponentsPaginationNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.raw.paginationHtml,
        htmlAttributes: {
            'ng-controller': 'PaginationCtrl as vm'
        },
        js: [this.snippets.raw.paginationJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
