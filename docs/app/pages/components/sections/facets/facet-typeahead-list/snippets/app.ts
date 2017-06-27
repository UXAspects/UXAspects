import { Component } from '@angular/core';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from 'ux-aspects';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    facets: Observable<Facet[]>;
    suggestions: Facet[] = [];

    private users: Facet[] = [];

    constructor() {

        // generate random facet data
        for (let idx = 0; idx < 1000; idx++) {
            this.users.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100 })));
        }

        // present the top 6 items as suggestions
        this.suggestions = this.users.slice(0, 6);

        // Create an observable which can be used for fetching data from server
        this.facets = Observable.create((observer: Observer<Facet[]>) => {

            // get the search query
            let searchQuery = (<any>observer).destination.outerValue;

            // simulate server request
            setTimeout(_ => {

                // return list of filtered users from "server"
                observer.next(this.users); 
            }, 750);
        });

    }
}