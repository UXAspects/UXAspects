import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-multiple-select-actions',
    templateUrl: './multiple-select-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleSelectActionsNg1Component')
export class ComponentsMultipleSelectActionsNg1Component extends BaseDocumentationSection {
    
    htmlCode = this.snippets.compiled.layoutHtml;
    selectionCode = this.snippets.compiled.selectionHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}