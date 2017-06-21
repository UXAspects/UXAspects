import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-standard-header-toolbar',
    templateUrl: './standard-header-toolbar.component.html'
})
@DocumentationSectionComponent('CssStandardHeaderToolbarComponent')
export class CssStandardHeaderToolbarComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}