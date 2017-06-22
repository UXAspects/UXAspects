import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-dynamic-name-callout',
    templateUrl: './dynamic-name-callout.component.html'
})
@DocumentationSectionComponent('CssDynamicNameCalloutComponent')
export class CssDynamicNameCalloutComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}