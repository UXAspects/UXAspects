import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-standard-header-toolbar',
    templateUrl: './standard-header-toolbar.component.html'
})
@DocumentationSectionComponent('CssStandardHeaderToolbarComponent')
export class CssStandardHeaderToolbarComponent {

    private htmlCode1 = require('./snippets/sample1.html');

    private htmlCode2 = require('./snippets/sample2.html');

    private htmlCode3 = require('./snippets/sample3.html');

}