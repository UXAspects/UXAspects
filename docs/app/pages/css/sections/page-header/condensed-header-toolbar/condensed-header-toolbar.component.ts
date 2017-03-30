import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-condensed-header-toolbar',
    templateUrl: './condensed-header-toolbar.component.html'
})
@DocumentationSectionComponent('CssCondensedHeaderToolbarComponent')
export class CssCondensedHeaderToolbarComponent {

    private htmlCode1 = require('./snippets/sample1.html');

    private htmlCode2 = require('./snippets/sample2.html');

    private htmlCode3 = require('./snippets/sample3.html');

}