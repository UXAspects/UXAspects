import { FilterAddEvent, FilterRemoveAllEvent, Filter, FilterRemoveEvent, FilterEvent } from '@ux-aspects/ux-aspects';
import { Component, Input } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ColorService } from '@ux-aspects/ux-aspects';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-filters',
    templateUrl: './filters.component.html'
})
@DocumentationSectionComponent('ComponentsFiltersComponent')
export class ComponentsFiltersComponent extends BaseDocumentationSection implements IPlunkProvider {

    activeFilters: Filter[] = [];  

    table: FilterSampleItem[] = [{
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

    statusFilters: Filter[] = [{
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

    authorFilters: Filter[] = [{
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
        placeholder: 'Find Author',
        minCharacters: 1
    };

    filteredTable: FilterSampleItem[] = this.table;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['FilterModule', 'ColorServiceModule', 'SparkModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    sparkTrackColor: string = this.colorService.getColor('accent').setAlpha(0.2).toRgba();
    sparkBarColor: string = this.colorService.getColor('accent').toHex();

    constructor(private colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

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
            
            case 'author':
                this.filteredTable = this.filteredTable.filter(item => item.author === filter.name);
                break;

            case 'status':
                this.filteredTable = this.filteredTable.filter(item => item.active === (filter.name === 'Active'));
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