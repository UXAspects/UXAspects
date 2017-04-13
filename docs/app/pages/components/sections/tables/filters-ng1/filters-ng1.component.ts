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
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/)
        );
    }

}