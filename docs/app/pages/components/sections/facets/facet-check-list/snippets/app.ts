import { Component } from '@angular/core';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from 'ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    facets: Facet[] = [];
    event: string;

    constructor() {

        // generate some facets
        for (let idx = 0; idx < 30; idx++) {
            this.facets.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100})));
        }
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