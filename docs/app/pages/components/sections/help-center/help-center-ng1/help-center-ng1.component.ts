import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-help-center-ng1',
    templateUrl: './help-center-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHelpCenterNg1Component')
export class ComponentsHelpCenterNg1Component extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}