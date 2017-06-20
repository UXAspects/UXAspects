import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-dynamic-facets-ng1',
    templateUrl: './dynamic-facets-ng1.components.html'
})
@DocumentationSectionComponent('ComponentsDynamicFacetsNg1Component')
export class ComponentsDynamicFacetsNg1Component extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}