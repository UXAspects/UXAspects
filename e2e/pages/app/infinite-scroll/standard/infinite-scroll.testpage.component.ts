import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'app',
    templateUrl: './infinite-scroll.testpage.component.html',
    styleUrls: ['./infinite-scroll.testpage.component.css']
})
export class InfiniteScrollTestPageComponent {

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText.pipe(debounceTime(50));

    allEmployees: any[] = [];
    loadedEmployees: any[] = [];

    loadCallback = this.load.bind(this);

    pageSize = 20;

    loadOnScroll: boolean = true;

    loading: boolean = false;
    exhausted: boolean = false;

    load(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
        let promise = new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.allEmployees
                    .filter((e) => this.isFilterMatch(e))
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            }, 100);
        });

        return promise;
    }

    isFilterMatch(e: any): boolean {
        const normalisedFilter = this.filterText.getValue().toLowerCase();
        return (e.name.toLowerCase().indexOf(normalisedFilter) >= 0);
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