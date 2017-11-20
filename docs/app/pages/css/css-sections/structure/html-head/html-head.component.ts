import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-structure-html-head',
    templateUrl: './html-head.component.html'
})
@DocumentationSectionComponent('CssHtmlHeadComponent')
export class CssHtmlHeadComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}