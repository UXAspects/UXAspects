import { Component } from '@angular/core';
import { Facet } from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-facet-container',
    templateUrl: './facet-container.component.html'
})
@DocumentationSectionComponent('ComponentsFacetContainerComponent')
export class ComponentsFacetContainerComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    facets: Facet[] = [];
    allowReorder = false;

    playground: IPlayground = {
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