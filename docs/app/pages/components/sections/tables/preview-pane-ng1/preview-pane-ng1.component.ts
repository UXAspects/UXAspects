import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-preview-pane',
    templateUrl: './preview-pane-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsPreviewPaneNg1Component')
export class ComponentsPreviewPaneNg1Component extends BaseDocumentationSection {
    
    private toggleCode = this.snippets.compiled.toggleHtml;
    private previewItemCode = this.snippets.compiled.previewPaneItemHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}