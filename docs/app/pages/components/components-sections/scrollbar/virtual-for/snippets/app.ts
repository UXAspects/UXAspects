import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    /** Store the current loading state */
    isLoading: boolean = false;

    /** Store the list of employees */
    employees: ReadonlyArray<Employee> = [];

    /** Store the current page */
    private _page: number = 0;

    constructor() {
        // load the first page
        this.load();
    }

    load(page: number = 0): void {

        // update the loading state
        this.isLoading = true;

        // create some new employees
        const employees: Employee[] = [];

        for (let idx = 1; idx <= 5000; idx++) {
            employees.push({
                id: idx + (5000 * page),
                name: chance.name(),
                email: chance.email(),
                department: chance.pickone([
                    'Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'
                ])
            });
        }

        // add delay to simulate server loading
        setTimeout(() => {
            this.employees = [...this.employees, ...employees];
            this.isLoading = false;
        }, 1000);
    }

    loadNextPage(): void {
        this.load(++this._page);
    }
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}