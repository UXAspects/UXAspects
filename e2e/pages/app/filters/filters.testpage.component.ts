import { ColorService, Filter, FilterEvent, FilterRemoveEvent, FilterAddEvent, FilterRemoveAllEvent } from '@ux-aspects/ux-aspects';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './filters.testpage.component.html',
})
export class FiltersTestPageComponent {

   activeFilters: Filter[] = [];  

    table: FilterSampleItem[] = [{
        id: 1,
        name: 'Document',
        author: 'Lily Clarke',
        date: '18 Dec 2016',
        completed: 97,
        active: true
    }, {
        id: 2,
        name: 'Email',
        author: 'Jesse Bass',
        date: '22 Dec 2016',
        completed: 15,
        active: true
    }, {
        id: 3,
        name: 'Email',
        author: 'Iva Rogers',
        date: '12 Dec 2016',
        completed: 20,
        active: false
    }, {
        id: 4,
        name: 'Email',
        author: 'Nina Copeland',
        date: '16 Dec 2016',
        completed: 74,
        active: true
    }, {
        id: 5,
        name: 'Email',
        author: 'Bradley Mason',
        date: '17 Dec 2016',
        completed: 63,
        active: false
    }, {
        id: 6,
        name: 'Document',
        author: 'Aaron Scott',
        date: '21 Dec 2016',
        completed: 21,
        active: true
    }, {
        id: 7,
        name: 'Document',
        author: 'Lily Clarke',
        date: '17 Dec 2016',
        completed: 85,
        active: true
    }, {
        id: 8,
        name: 'Document',
        author: 'Lily Clarke',
        date: '17 Dec 2016',
        completed: 11,
        active: true
    }];

    statusFilters: Filter[] = [{
        group: 'Status',
        title: 'Status',
        name: 'Status (All)',
        initial: true
    }, {
        group: 'Status',
        title: 'Active',
        name: 'Active'
    }, {
        group: 'Status',
        title: 'Inactive',
        name: 'Inactive'
    }];

    authorFilters: Filter[] = [{
        group: 'Author',
        title: 'Author',
        name: 'Author (All)',
        initial: true,
    }, {
        group: 'Author',
        title: 'Lily Clarke',
        name: 'Lily Clarke'
    }, {
        group: 'Author',
        title: 'Jesse Bass',
        name: 'Jesse Bass'
    }, {
        group: 'Author',
        title: 'Iva Rogers',
        name: 'Iva Rogers'
    }, {
        group: 'Author',
        title: 'Nina Copeland',
        name: 'Nina Copeland'
    }, {
        group: 'Author',
        title: 'Bradley Mason',
        name: 'Bradley Mason'
    }, {
        group: 'Author',
        title: 'Aaron Scott',
        name: 'Aaron Scott'
    }, {
        group: 'Author',
        title: 'Ethel Collier',
        name: 'Ethel Collier'
    }, {
        group: 'Author',
        title: 'Lois Saunders',
        name: 'Lois Saunders'
    }];

    typeaheadOptions = {
        placeholder: 'Find Author',
        minCharacters: 1
    };

    filteredTable: FilterSampleItem[] = this.table;

    sparkTrackColor: string = this.colorService.getColor('accent').setAlpha(0.2).toRgba();
    sparkBarColor: string = this.colorService.getColor('accent').toHex();

    constructor(private colorService: ColorService) { }

    filtersChanged(event: FilterEvent) {

        // apply a newly added filter
        if (event instanceof FilterAddEvent) {
            this.applyFilter(event.filter);
        }

        // remove an active filter
        if (event instanceof FilterRemoveEvent) {
            this.resetData();
            this.activeFilters = this.activeFilters.filter(filter => filter !== event.filter);
            this.activeFilters.forEach(filter => this.applyFilter(filter));
        }

        // remove all filters
        if (event instanceof FilterRemoveAllEvent) {
            this.resetData();
            this.resetFilters();
        }
    }

    resetFilters(): void {
        this.activeFilters = [];
    }

    resetData(): void {
        this.filteredTable = this.table.slice();
    }

    applyFilter(filter: Filter): void {

        switch (filter.group) {

            case 'Author':
                this.filteredTable = this.filteredTable.filter(item => item.author === filter.name);
                break;

            case 'Status':
                this.filteredTable = this.filteredTable.filter(
                    item => item.active === (filter.name === 'Active')
                );
                break;
        }

        this.activeFilters.push(filter);
    }

}

interface FilterSampleItem {
    id: number;
    name: string;
    author: string;
    date: string;
    completed: number;
    active: boolean;
}