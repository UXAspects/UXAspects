import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from '@ux-aspects/ux-aspects';
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
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'facet-component.component.html': this.snippets.raw.facetComponentHtml,
            'facet-component.component.css': this.snippets.raw.facetComponentCss,
            'facet-component.component.ts': this.snippets.raw.facetComponentTs
        },
        modules: [{
            imports: ['FacetsModule', 'CheckboxModule'],
            library: '@ux-aspects/ux-aspects'
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