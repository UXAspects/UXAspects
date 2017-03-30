import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-list-hover-actions',
    templateUrl: './list-hover-actions-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsListHoverActionsNg1Component')
export class ComponentsListHoverActionsNg1Component {
    
    private htmlCode = require('./snippets/sample.html');
}