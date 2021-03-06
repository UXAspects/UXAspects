import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'app',
    templateUrl: './infinite-scroll-immediate.testpage.component.html',
    styleUrls: ['./infinite-scroll-immediate.testpage.component.css']
})
export class InfiniteScrollImmediateTestPageComponent {

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText;

    allEmployees: any[] = [];
    loadedEmployees: any[] = [];
    loadCallback = this.load.bind(this);
    pageSize = 20;

    loadOnScroll: boolean = true;

    load(pageNum: number, pageSize: number): Promise<any[]> {
        return new Promise<string[]>(resolve => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.allEmployees
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            });
        });
    }

    constructor() {
        for (let i = 0; i < 111; i += 1) {
            const name = 'employee_' + i;
            this.allEmployees.push({
                id: i,
                name: name,
                department: 'department_' + i,
                email: name.toLowerCase().replace(' ', '.') + '@business.com'
            });
        }
    }
}