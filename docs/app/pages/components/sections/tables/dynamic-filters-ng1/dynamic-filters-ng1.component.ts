import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-dynamic-filters',
    templateUrl: './dynamic-filters-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDynamicFiltersNg1Component')
export class ComponentsDynamicFiltersNg1Component extends BaseDocumentationSection {
    
    private filterContainerCode = this.snippets.compiled.filterContainerHtml;
    private filterControllerCode = this.snippets.compiled.filterContainerJs;
    private filterOptionsCode = this.snippets.compiled.filterOptionsJs;
    private filterCode = this.snippets.compiled.filterHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}