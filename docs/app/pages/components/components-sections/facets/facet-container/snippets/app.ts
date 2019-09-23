import { Component } from '@angular/core';
import { Facet } from '@ux-aspects/ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    facets: Facet[] = [];
    allowReorder = false;

    addFacet() {

        // create a new random facet
        this.facets.push(new Facet(chance.name(), {}, chance.integer({ min: 0, max: 100 })));
    }
}