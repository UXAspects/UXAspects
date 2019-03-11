import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    employees: Employee[] = [];

    constructor() {
        for (let idx = 1; idx <= 10000; idx++) {
            this.employees.push({
                id: idx,
                name: chance.name(),
                email: chance.email(),
                department: chance.pickone(['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'])
            });
        }
    }
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}