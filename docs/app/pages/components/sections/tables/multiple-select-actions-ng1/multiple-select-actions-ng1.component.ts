import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-multiple-select-actions',
    templateUrl: './multiple-select-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleSelectActionsNg1Component')
export class ComponentsMultipleSelectActionsNg1Component {
    
    private htmlCode = require('./snippets/layout.html');
    private selectionCode = require('./snippets/selection.html');

}