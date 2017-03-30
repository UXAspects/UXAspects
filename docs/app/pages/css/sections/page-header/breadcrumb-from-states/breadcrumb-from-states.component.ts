import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-breadcrumb-from-states',
    templateUrl: './breadcrumb-from-states.component.html'
})
@DocumentationSectionComponent('CssBreadcrumbFromStatesComponent')
export class CssBreadcrumbFromStatesComponent {

    private jsCode = require('./snippets/sample.js');

    private htmlCode = require('./snippets/sample.html');

}