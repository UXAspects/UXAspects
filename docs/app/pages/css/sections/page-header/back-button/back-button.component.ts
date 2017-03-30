import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-back-button',
    templateUrl: './back-button.component.html'
})
@DocumentationSectionComponent('CssBackButtonComponent')
export class CssBackButtonComponent {

    private htmlCode = require('./snippets/sample.html');

    private jsCode = require('./snippets/sample.js');

    private htmlCodeHide = require('./snippets/sample-hide.html');

    private jsCodeHide = require('./snippets/sample-hide.js');

}