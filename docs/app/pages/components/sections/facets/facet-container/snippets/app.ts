import { Component } from '@angular/core';
import { Facet } from 'ux-aspects';
import 'chance';

@Component({
    selector: 'my-app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    facets: Facet[] = [];

    addFacet() {

        // create a new random facet
        this.facets.push(new Facet(chance.name(), {}, chance.integer({ min: 0, max: 100 })));
    }
}