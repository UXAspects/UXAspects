import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
@Component({
    selector: 'uxd-components-expanding-content-ng1',
    templateUrl: './expanding-content-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsExpandingContentNg1Component')
export class ComponentsExpandingContentNg1Component {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');
    
}