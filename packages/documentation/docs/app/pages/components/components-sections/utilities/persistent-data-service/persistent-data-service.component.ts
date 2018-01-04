import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
 
@Component({
    selector: 'uxd-components-persistent-data-service',
    templateUrl: './persistent-data-service.component.html'
})
@DocumentationSectionComponent('ComponentsPersistentDataServiceComponent')
export class ComponentsPersistentDataServiceComponent extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
 