import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-preview-pane',
    templateUrl: './preview-pane-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsPreviewPaneNg1Component')
export class ComponentsPreviewPaneNg1Component {
    
    private toggleCode = require('./snippets/toggle.html');
    private previewItemCode = require('./snippets/preview-pane-item.html');
}