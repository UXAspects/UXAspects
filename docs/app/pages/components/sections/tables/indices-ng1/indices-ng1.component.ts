import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-indices',
    templateUrl: './indices-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsIndicesNg1Component')
export class ComponentsIndicesNg1Component {
    
    private htmlCode = require('./snippets/sample.html'); 
}