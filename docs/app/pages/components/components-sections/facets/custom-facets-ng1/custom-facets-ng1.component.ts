import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-custom-facets-ng1',
    templateUrl: './custom-facets-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFacetsNg1Component')
export class ComponentsCustomFacetsNg1Component extends BaseDocumentationSection {
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}