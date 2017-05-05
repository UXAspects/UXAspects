import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Facet, FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from '../../../../../../../src/index';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'chance';

@Component({
    selector: 'uxd-components-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
@DocumentationSectionComponent('ComponentsFacetTypeaheadListComponent')
export class ComponentsFacetTypeaheadListComponent implements IPlunkProvider {

    facets: Observable<Facet[]>;

    private users: Facet[] = [];

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

    constructor() {

        // generate random facet data
        for (let idx = 0; idx < 1000; idx++) {
            this.users.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100 })));
        }

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