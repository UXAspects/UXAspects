import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-header-nav-tab-toolbar',
    templateUrl: './header-nav-tab-toolbar.component.html'
})
@DocumentationSectionComponent('CssHeaderNavTabToolbarComponent')
export class CssHeaderNavTabToolbarComponent {

    private htmlCode1 = require('./snippets/sample1.html');

    private htmlCode2 = require('./snippets/sample2.html');

    private jsCode = require('./snippets/sample.js');

}