import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-multiple-selection-row',
    templateUrl: './multiple-selection-row-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleSelectionRowNg1Component')
export class ComponentsMultipleSelectionRowNg1Component {
    
    private htmlCode = require('./snippets/layout.html');
}