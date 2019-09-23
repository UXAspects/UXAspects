import { Component } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-custom-facet-component',
    templateUrl: './custom-facet-component.component.html'
})
@DocumentationSectionComponent('ComponentsCustomFacetComponent')
export class ComponentsCustomFacetComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
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