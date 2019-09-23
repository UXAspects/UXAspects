import { Component } from '@angular/core';
import { Facet } from '@ux-aspects/ux-aspects';
import 'chance';
import { Observable, Observer } from 'rxjs';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-facet-typeahead-list',
    templateUrl: './facet-typeahead-list.component.html'
})
@DocumentationSectionComponent('ComponentsFacetTypeaheadListComponent')
export class ComponentsFacetTypeaheadListComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    facets: Observable<Facet[]>;
    suggestions: Facet[] = [];
    query: string = '';
    users: Facet[] = [];

    playground: IPlayground = {
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

        // generate random facet data
        for (let idx = 0; idx < 1000; idx++) {
            this.users.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100 })));
        }

        // sort the users alphabetically
        this.users.sort((userOne, userTwo) => {
            if (userOne.title < userTwo.title) {
                return -1;
            }

            if (userOne.title > userTwo.title) {
                return 1;
            }

            return 0;
        });

        // present the top 6 items as suggestions
        this.suggestions = this.users.slice(0, 6);

        // Create an observable which can be used for fetching data from server
        this.facets = Observable.create((observer: Observer<Facet[]>) => {
            // simulate server request
            setTimeout(() => {

                // return list of filtered users from "server"
                observer.next(this.users.filter(user => user.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1));
            }, 750);
        });

    }
}