import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-dynamic-name-callout',
    templateUrl: './dynamic-name-callout.component.html'
})
@DocumentationSectionComponent('CssDynamicNameCalloutComponent')
export class CssDynamicNameCalloutComponent {

    private htmlCode = require('./snippets/sample.html');

    private jsCode = require('./snippets/sample.js');

}