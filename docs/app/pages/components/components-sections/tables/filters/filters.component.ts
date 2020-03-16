import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { Filter, FilterAddEvent, FilterEvent, FilterRemoveAllEvent, FilterRemoveEvent } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-filters',
    templateUrl: './filters.component.html'
})
@DocumentationSectionComponent('ComponentsFiltersComponent')
export class ComponentsFiltersComponent extends BaseDocumentationSection implements IPlaygroundProvider {


    filters: Filter[] = [];

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

    dataSource: ReadonlyArray<FilterSampleItem> = [{
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

    documents: ReadonlyArray<FilterSampleItem> = [...this.dataSource];

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [
            {
                imports: ['FilterModule', 'ColorServiceModule', 'SparkModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    constructor(private _announcer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    /** Provide accesibility feedback */
    onEvent(event: FilterEvent) {

        // announce the selection
        if (event instanceof FilterAddEvent) {
            this._announcer.announce(`Filter ${event.filter.name} selected.`);
        }

        // announce the deselection
        if (event instanceof FilterRemoveEvent) {
            this._announcer.announce(`Filter ${event.filter.name} deselected.`);
        }

        // announce the deselection of all filters
        if (event instanceof FilterRemoveAllEvent) {
            this._announcer.announce(`All filters deselected.`);
        }
    }

    apply(): void {

        // restore the table data to the full datasource
        this.documents = [...this.dataSource];

        // apply each filter
        this.filters.forEach(filter => {
            switch (filter.group) {

                case 'Author':
                    this.documents = this.documents.filter(item => item.author === filter.name);
                    break;

                case 'Status':
                    this.documents = this.documents.filter(item => item.active === (filter.name === 'Active'));
                    break;
            }
        });
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