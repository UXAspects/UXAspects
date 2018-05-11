import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-float-label',
    templateUrl: './float-label.component.html',
    // styleUrls: ['./float-label.component.less']
})
@DocumentationSectionComponent('ComponentsFloatLabelComponent')
export class ComponentsFloatLabelComponent extends BaseDocumentationSection {
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}