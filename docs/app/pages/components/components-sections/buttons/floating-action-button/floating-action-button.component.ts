import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    styleUrls: ['./floating-action-button.component.less']
})
@DocumentationSectionComponent('ComponentsFloatingActionButtonComponent')
export class ComponentsFloatingActionButtonComponent extends BaseDocumentationSection {

    direction: string = 'right';

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
