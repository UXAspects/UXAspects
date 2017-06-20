import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';

@Component({
    selector: 'uxd-components-custom-facet-component',
    templateUrl: './custom-facet-component.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFacetComponent')
export class ComponentsCustomFacetComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.examples.appTs,
            'app.component.html': this.snippets.examples.appHtml,
            'facet-component.component.html': this.snippets.examples.facetComponentHtml,
            'facet-component.component.css': this.snippets.examples.facetComponentCss,
            'facet-component.component.ts': this.snippets.examples.facetComponentTs
        },
        modules: [{
            imports: ['FacetsModule', 'CheckboxModule'],
            library: 'ux-aspects'
        }, {
            imports: ['SampleCustomFacetComponent'],
            library: './facet-component.component',
            declaration: true
        }]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}