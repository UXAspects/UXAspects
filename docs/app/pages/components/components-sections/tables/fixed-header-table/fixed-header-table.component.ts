import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-fixed-header-table',
    templateUrl: './fixed-header-table.component.html',
    styleUrls: ['./fixed-header-table.component.less']
})
@DocumentationSectionComponent('ComponentsFixedHeaderTableComponent')
export class ComponentsFixedHeaderTableComponent extends BaseDocumentationSection implements IPlunkProvider {

    people: ReadonlyArray<Person> = [];
    loading: boolean = false;
    total: number = 250;

    private _page: number = 0;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                library: 'chance'
            },
            {
                imports: ['FixedHeaderTableModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

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
        setTimeout(() => {

            // update the list of people and increment the current page
            this.people = [...this.people, ...this.getPeople(this._page++, 50)];

            // set the loading state to false
            this.loading = false;

        }, 2000);
    }

    /**
     * Generate some data about people
     */
    private getPeople(page: number, count: number): Person[] {

        // create an array of people
        const people: Person[] = [];

        // populate the array with dummy data
        for (let idx = page * count; idx < (page * count) + count; idx++) {
            people.push({
                id: idx,
                name: chance.name(),
                address: chance.address(),
                phone: chance.phone(),
                active: chance.bool()
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
    active: boolean;
}