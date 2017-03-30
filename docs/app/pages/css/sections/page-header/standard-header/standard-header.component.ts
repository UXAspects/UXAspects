import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-standard-header',
    templateUrl: './standard-header.component.html'
})
@DocumentationSectionComponent('CssStandardHeaderComponent')
export class CssStandardHeaderComponent {

    private htmlCode1 = require('./snippets/sample1.html');

    private htmlCode2 = require('./snippets/sample2.html');

    private htmlCode3 = require('./snippets/sample3.html');

    private htmlCode4 = require('./snippets/sample4.html');

    private htmlCode5 = require('./snippets/sample5.html');

    private htmlCode6 = require('./snippets/sample6.html');

    private htmlCode7 = require('./snippets/sample7.html');

    private htmlCode8 = require('./snippets/sample8.html');

    private htmlCode9 = require('./snippets/sample9.html');

}