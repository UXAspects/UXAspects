import { Component } from '@angular/core';
import 'chance';
import { Subject } from 'rxjs';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'virtual-scroll-app',
    templateUrl: './virtual-scroll.testpage.component.html',
    styleUrls: ['./virtual-scroll.testpage.component.css']
})
export class VirtualScrollTestPageComponent {

    loadOnScroll: boolean = true;
    employees: Subject<Employee[]> = new Subject<Employee[]>();

    loadPage(pageNumber: number): void {

        const pageSize = 2000;
        const startIdx = pageNumber * pageSize;
        const endIdx = startIdx + pageSize;
        const employees: Employee[] = [];

        // generate sample employee data
        for (let idx = startIdx; idx < endIdx; idx++) {

            const name = 'Employee_' + idx;

            employees.push({
                id: idx,
                name: name,
                email: name.toLowerCase().replace('_', '.') + '@business.com',
                department: 'Department_' + idx,
            });
        }

        // push the next batch of employees to the subject - (delay to simulate server time)
        setTimeout(() => {
            this.employees.next(employees);

            // impose a limit of 10 pages
            if (pageNumber === 10) {
                this.employees.complete();
            }
        }, 200);
    }
}

interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}