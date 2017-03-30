import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-help-center-ng1',
    templateUrl: './help-center-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHelpCenterNg1Component')
export class ComponentsHelpCenterNg1Component {
    
    private htmlCode = require('./snippets/help-center.html');

    private exampleHtmlCode = require('./snippets/help-center-button.html');
    private exampleJsCode = require('./snippets/help-center.js');
}