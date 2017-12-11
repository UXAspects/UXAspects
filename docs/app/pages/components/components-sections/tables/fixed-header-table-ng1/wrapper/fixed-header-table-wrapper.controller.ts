import * as angular from 'angular';
import 'chance';

export class FixedHeaderTableWrapperController {

    people: Person[] = [];
    loading: boolean = false;

    private _page: number = 0;

    static $inject = ['$timeout'];
    constructor(private $timeout: angular.ITimeoutService) { }

    /**
     * Simulate the server request
     */
    loadPage(): void {

        // if we are currently loading or are loading more than 5 pages
        if (this.loading || this._page >= 5) {
            return;
        }

        // update the loading state
        this.loading = true;

        // simulate server call
        this.$timeout(() => {

            // update the list of people and increment the current page
            this.people = this.people.concat(this.getPeople(this._page++, 50));

            // set the loading state to false
            this.loading = false;

        }, 2000);
    }

    getPeople(page: number, count: number): Person[] {

        // create an array of people
        const people: Person[] = [];

        // populate the array with dummy data
        for (let idx = page * count; idx < (page * count) + count; idx++) {
            people.push({
                id: idx,
                name: chance.name(),
                address: chance.address(),
                phone: chance.phone(),
                country: chance.country()
            });
        }

        return people;
    }
}

interface Person {
    id: number;
    name: string;
    address: string;
    phone: string;
    country: string;
}