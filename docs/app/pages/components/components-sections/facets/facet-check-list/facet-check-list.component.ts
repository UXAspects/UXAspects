import { Component } from '@angular/core';
import 'chance';
import { Facet } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-facet-check-list',
    templateUrl: './facet-check-list.component.html'
})
@DocumentationSectionComponent('ComponentsFacetCheckListComponent')
export class ComponentsFacetCheckListComponent extends BaseDocumentationSection implements IPlunkProvider {

    facets: Facet[] = [];

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['FacetsModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // generate some facets
        for (let idx = 0; idx < 30; idx++) {
            this.facets.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100})));
        }

        // sort the users alphabetically
        this.facets.sort((facetOne, facetTwo) => {
            if (facetOne.title < facetTwo.title) {
                return -1;
            } 

            if (facetOne.title > facetTwo.title) {
                return 1;
            }

            return 0;
        });
    }
}