import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-header-nav-tab-toolbar',
    templateUrl: './header-nav-tab-toolbar.component.html'
})
@DocumentationSectionComponent('CssHeaderNavTabToolbarComponent')
export class CssHeaderNavTabToolbarComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}