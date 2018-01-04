import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-breadcrumb-from-states',
    templateUrl: './breadcrumb-from-states.component.html'
})
@DocumentationSectionComponent('CssBreadcrumbFromStatesComponent')
export class CssBreadcrumbFromStatesComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}