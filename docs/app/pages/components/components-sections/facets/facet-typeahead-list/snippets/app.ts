import { Component } from '@angular/core';
import { Facet } from '@ux-aspects/ux-aspects';
import 'chance';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    facets: Observable<Facet[]>;
    suggestions: Facet[] = [];
    query: string = '';
    users: Facet[] = [];

    constructor() {

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
                observer.next(this.users.filter(user =>
                    user.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
                ));
            }, 750);
        });

    }
}