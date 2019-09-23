import { Component } from '@angular/core';
import { Facet } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'facet-container-app',
    templateUrl: './facet-container.testpage.component.html'
})
export class FacetContainerTestPageComponent {

    facets: Facet[] = [];

    count: number = 1;

    addFacet() {

        // create a new random facet
        this.facets.push(new Facet(`User ${this.count++}`, {}, this.count));
    }
}
