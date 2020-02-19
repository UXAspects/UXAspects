import { Component } from '@angular/core';
import 'chance';
import { TypeaheadKeyService } from '@ux-aspects/ux-aspects';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    values: ReadonlyArray<string> = [];

    dropdownOpen: boolean = false;
    selectOnEnter: boolean = true;
    dropDirection: 'auto' | 'up' | 'down' = 'down';
    selectFirst: boolean = true;
    recentOptions: ReadonlyArray<string>;
    recentOptionsMaxCount: number = 5;

    input: string = '';

    loadOptionsFn = this.loadOptions.bind(this);

    /** Load the options and filter the them */
    loadOptions(pageNum: number, pageSize: number, filter: string): Promise<ReadonlyArray<string>> {

        // get the values for the current page based on the filter text provided
        const values = this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .slice(pageNum * pageSize, (pageNum + 1) * pageSize);

        // return the values after a delay to simulate server response time
        return of(values).pipe(delay(1000)).toPromise();
    }

    constructor(public typeaheadKeyService: TypeaheadKeyService<string>) {

        /* Adding values to typeahead list */
        for (let index = 0; index < 200; index++) {
            this.values = [...this.values, chance.name()];
        }
    }

}