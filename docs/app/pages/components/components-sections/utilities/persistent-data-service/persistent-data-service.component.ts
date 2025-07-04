import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-persistent-data-service',
    templateUrl: './persistent-data-service.component.html',
    standalone: false
})
@DocumentationSectionComponent('ComponentsPersistentDataServiceComponent')
export class ComponentsPersistentDataServiceComponent extends BaseDocumentationSection {
    constructor() {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );
    }
}
