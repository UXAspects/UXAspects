import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-column-resizing',
    templateUrl: './column-resizing.component.html',
    styleUrls: ['./column-resizing.component.less']
})
@DocumentationSectionComponent('ComponentsColumnResizingComponent')
export class ComponentsColumnResizingComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}