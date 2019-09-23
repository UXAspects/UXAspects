import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-dynamic-filters',
    templateUrl: './dynamic-filters-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsDynamicFiltersNg1Component')
export class ComponentsDynamicFiltersNg1Component extends BaseDocumentationSection {
    
    filterContainerCode = this.snippets.compiled.filterContainerHtml;
    filterControllerCode = this.snippets.compiled.filterContainerJs;
    filterOptionsCode = this.snippets.compiled.filterOptionsJs;
    filterCode = this.snippets.compiled.filterHtml;
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}