import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-multiple-selection-row',
    templateUrl: './multiple-selection-row-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleSelectionRowNg1Component')
export class ComponentsMultipleSelectionRowNg1Component extends BaseDocumentationSection {
    
    private htmlCode = this.snippets.compiled.layoutHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}