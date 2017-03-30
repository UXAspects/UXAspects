import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-sorting',
    templateUrl: './sorting-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSortingNg1Component')
export class ComponentsSortingNg1Component {
    
    private sortingCode = require('./snippets/layout.html');
    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

}