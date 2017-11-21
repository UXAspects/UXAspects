import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-page-header-header-content-panel',
    templateUrl: './header-content-panel.component.html'
})
@DocumentationSectionComponent('CssHeaderContentPanelComponent')
export class CssHeaderContentPanelComponent extends BaseDocumentationSection {
    
    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }
}