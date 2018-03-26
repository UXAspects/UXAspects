import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-traditional-multiple-select-actions',
    templateUrl: './traditional-multiple-select-actions-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTraditionalMultipleSelectActionsNg1Component')
export class ComponentsTraditionalMultipleSelectActionsNg1Component extends BaseDocumentationSection {
    
    htmlCode = this.snippets.compiled.layoutHtml;
    selectionCode = this.snippets.compiled.selectionHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}