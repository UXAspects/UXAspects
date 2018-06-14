import { Component } from '@angular/core';
import 'chance';
import { Facet } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-facet-container',
    templateUrl: './facet-container.component.html'
})
@DocumentationSectionComponent('ComponentsFacetContainerComponent')
export class ComponentsFacetContainerComponent extends BaseDocumentationSection implements IPlunkProvider {

    facets: Facet[] = [];
    allowReorder = false;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['FacetsModule', 'CheckboxModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    addFacet() {

        // create a new random facet
        this.facets.push(new Facet(chance.name(), {}, chance.integer({ min: 0, max: 100 })));
    }
}