import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-facets-ng1',
    templateUrl: './facets-ng1.components.html'
})
@DocumentationSectionComponent('ComponentsFacetsNg1Component')
export class ComponentsFacetsNg1Component extends BaseDocumentationSection {

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}