import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-page-header-breadcrumb-with-tab-state',
    templateUrl: './breadcrumb-with-tab-state.component.html'
})
@DocumentationSectionComponent('CssBreadcrumbWithTabStateComponent')
export class CssBreadcrumbWithTabStateComponent {

    private htmlCode = require('./snippets/sample.html');

    private jsCode = require('./snippets/sample1.js');

    private jsCode2 = require('./snippets/sample2.js');

}