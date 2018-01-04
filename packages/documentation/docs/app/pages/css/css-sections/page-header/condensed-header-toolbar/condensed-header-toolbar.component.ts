import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-condensed-header-toolbar',
    templateUrl: './condensed-header-toolbar.component.html'
})
@DocumentationSectionComponent('CssCondensedHeaderToolbarComponent')
export class CssCondensedHeaderToolbarComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}