import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-filters',
    templateUrl: './filters-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFiltersNg1Component')
export class ComponentsFiltersNg1Component extends BaseDocumentationSection {
    
    private filterContainerCode = this.snippets.compiled.filterContainerHtml;
    private filterCode = this.snippets.compiled.filterHtml;
    private filterOptionsCode = this.snippets.compiled.filterOptionsHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}