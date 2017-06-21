import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-side-navigation-menu-button',
    templateUrl: './menu-button.component.html'
})
@DocumentationSectionComponent('ComponentsMenuButtonComponent')
export class ComponentsMenuButtonComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}