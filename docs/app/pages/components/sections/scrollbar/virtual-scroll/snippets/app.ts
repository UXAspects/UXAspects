import 'chance';
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent {

    loadOnScroll: boolean = true;
    employees: Subject<Employee[]> = new Subject<Employee[]>();

    loadPage(pageNumber: number): void {

        const pageSize = 2000;
        const startIdx = pageNumber * pageSize;
        const endIdx = startIdx + pageSize;
        const employees: Employee[] = [];

        // generate sample employee data
        for (let idx = startIdx; idx < endIdx; idx++) {

            const name = chance.name();

            employees.push({
                id: idx,
                name: name,
                email: name.toLowerCase().replace(' ', '.') + '@business.com',
                department: chance.pickone(DEPARTMENTS)
            });
        }

        // push the next batch of employees to the subject - (delay to simulate server time)
        setTimeout(() => {
            this.employees.next(employees);

            // impose a limit of 10 pages
            if (pageNumber === 10) {
                this.employees.complete();
            }
        }, 1000);
    }
}

interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}