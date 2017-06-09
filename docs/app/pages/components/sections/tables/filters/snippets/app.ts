import { ColorService, Filter, FilterEvent, FilterRemoveEvent, FilterAddEvent, FilterRemoveAllEvent } from 'ux-aspects';
import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
})
export class AppComponent {

    activeFilters: Filter[] = [];  

    table: Table[] = [{
        id: 1,
        name: 'Document',
        author: 'Lily Clarke',
        date: '18 Dec 2016',
        completed: 97,
        active: chance.bool()
    }, {
        id: 2,
        name: 'Email',
        author: 'Jesse Bass',
        date: '22 Dec 2016',
        completed: 15,
        active: chance.bool()
    }, {
        id: 3,
        name: 'Email',
        author: 'Iva Rogers',
        date: '12 Dec 2016',
        completed: 20,
        active: chance.bool()
    }, {
        id: 4,
        name: 'Email',
        author: 'Nina Copeland',
        date: '16 Dec 2016',
        completed: 74,
        active: chance.bool()
    }, {
        id: 5,
        name: 'Email',
        author: 'Bradley Mason',
        date: '17 Dec 2016',
        completed: 63,
        active: chance.bool()
    }, {
        id: 6,
        name: 'Document',
        author: 'Aaron Scott',
        date: '21 Dec 2016',
        completed: 21,
        active: chance.bool()
    }, {
        id: 7,
        name: 'Document',
        author: 'Lily Clarke',
        date: '17 Dec 2016',
        completed: 85,
        active: chance.bool()
    }, {
        id: 8,
        name: 'Document',
        author: 'Lily Clarke',
        date: '17 Dec 2016',
        completed: 11,
        active: chance.bool()
    }];

    statusFilters = [{
        group: 'status',
        title: 'Status',
        name: 'Status (All)',
        initial: true
    }, {
        group: 'status',
        title: 'Active',
        name: 'Active'
    }, {
        group: 'status',
        title: 'Inactive',
        name: 'Inactive'
    }];

    authorFilters = [{
        group: 'author',
        title: 'Author',
        name: 'Author (All)',
        initial: true,
    }, {
        group: 'author',
        title: 'Lily Clarke',
        name: 'Lily Clarke'
    }, {
        group: 'author',
        title: 'Jesse Bass',
        name: 'Jesse Bass'
    }, {
        group: 'author',
        title: 'Iva Rogers',
        name: 'Iva Rogers'
    }, {
        group: 'author',
        title: 'Nina Copeland',
        name: 'Nina Copeland'
    }, {
        group: 'author',
        title: 'Bradley Mason',
        name: 'Bradley Mason'
    }, {
        group: 'author',
        title: 'Aaron Scott',
        name: 'Aaron Scott'
    }, {
        group: 'author',
        title: 'Ethel Collier',
        name: 'Ethel Collier'
    }, {
        group: 'author',
        title: 'Lois Saunders',
        name: 'Lois Saunders'
    }];

    typeaheadOptions = {
        placeholder: 'Find Author'
    };

    sparkTrackColor: string;
    sparkBarColor: string;

    filteredTable: Table[] = this.table;

    constructor(colorService: ColorService) {
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

    filtersChanged(event: FilterEvent) {

        if (event instanceof FilterAddEvent) {
            if (event.filter.group === 'author') {
                this.filterNames(event.filter);
            } else if (event.filter.group === 'status') {
                this.filterStatus(event.filter);
            }
            this.activeFilters.push(event.filter);
        }

        if (event instanceof FilterRemoveEvent) {
            if (this.activeFilters.length > 1) {
                let idx = this.activeFilters.findIndex(filter => filter === event.filter);
                this.activeFilters.splice(idx, 1);

                this.filteredTable = this.table;

                this.activeFilters.forEach(element => {
                    if (element.group === 'author') {
                        this.filterNames(element);
                    } else if (element.group === 'status') {
                        this.filterStatus(element);
                    }
                });

            } else {
                this.activeFilters = [];
                this.filteredTable = this.table;
            }
        }
        
        if (event instanceof FilterRemoveAllEvent) {
            this.activeFilters = [];
            this.filteredTable = this.table;
        }
    }

    filterNames(filter: Filter) {
        let newTable: Table[] = [];

        this.filteredTable.forEach(element => {
            if (element.author === filter.name) {
                newTable.push(element);
            }
        });

        this.filteredTable = newTable;
    }

    filterStatus(filter: Filter) {
        let newTable: Table[] = [];
        let active = false;

        if (filter.name === 'Active') {
            active = true;
        }

        this.filteredTable.forEach(element => {
            if (element.active === active) {
                newTable.push(element);
            }
        });

        this.filteredTable = newTable;
    }

}

interface Table {
    id: number;
    name: string;
    author: string;
    date: string;
    completed: number;
    active: boolean;
}