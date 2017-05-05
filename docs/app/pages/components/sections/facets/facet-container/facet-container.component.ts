import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Facet } from '../../../../../../../src/index';
import 'chance';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-facet-container',
    templateUrl: './facet-container.component.html'
})
@DocumentationSectionComponent('ComponentsFacetContainerComponent')
export class ComponentsFacetContainerComponent implements IPlunkProvider {

    facets: Facet[] = [];

    htmlCode = require('./snippets/app.html');
    tsCode = require('./snippets/app.ts');

    plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html')
        },
        mappings: [
            {
                alias: 'chance',
                source: 'npm:chance@1.0.6'
            }
        ],
        modules: [{
            imports: ['FacetsModule'],
            library: 'ux-aspects'
        }]
    };

    addFacet() {

        // create a new random facet
        this.facets.push(new Facet(chance.name(), {}, chance.integer({ min: 0, max: 100 })));
    }
}