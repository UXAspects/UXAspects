import { Component } from '@angular/core';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from '../../../../dist/lib/index.js';
import 'chance';

@Component({
    selector: 'facet-check-list-app',
    templateUrl: './facet-check-list.testpage.component.html'
})
export class FacetCheckListTestPageComponent {

    facets: Facet[] = [];
    event: string;

    constructor() {

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

    onEvent(event: FacetEvent) {

        if (event instanceof FacetSelect) {
            this.event = `${ event.facet.title } was selected!`;
        }

        if (event instanceof FacetDeselect) {
            this.event = `${ event.facet.title } was deselected!`;
        }

        if (event instanceof FacetDeselectAll) {
            this.event = 'All facets were deselected!';
        }

    }
}
