import { Component } from '@angular/core';
import { Facet } from '../../../../dist/lib/index.js';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './facet-container.testpage.component.html'
})
export class FacetContainerTestPageComponent {

    facets: Facet[] = [];

    addFacet() {

        // create a new random facet
        this.facets.push(new Facet(chance.name(), {}, chance.integer({ min: 0, max: 100 })));
    }
}
