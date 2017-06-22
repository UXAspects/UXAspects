import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-breadcrumb-with-tab-state',
    templateUrl: './breadcrumb-with-tab-state.component.html'
})
@DocumentationSectionComponent('CssBreadcrumbWithTabStateComponent')
export class CssBreadcrumbWithTabStateComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}