import 'chance';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const chance = new Chance();

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'app',
    templateUrl: 'src/app.component.html',
    styleUrls: ['src/app.component.css']
})
export class AppComponent {

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText.debounceTime(500);

    allEmployees: any[] = [];
    loadedEmployees: any[] = [];

    loadCallback = this.load.bind(this);

    pageSize = 20;

    loadOnScroll: boolean = true;

    loading: boolean = false;
    exhausted: boolean = false;

    load(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.allEmployees
                    .filter((e) => this.isFilterMatch(e))
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            }, 2000);
        });

        return promise;
    }

    isFilterMatch(e: any): boolean {
        const normalisedFilter = this.filterText.getValue().toLowerCase();
        return (e.name.toLowerCase().indexOf(normalisedFilter) >= 0);
    }

    constructor() {
        for (let i = 0; i < 111; i += 1) {
            const name = chance.name();
            this.allEmployees.push({
                id: i,
                name: name,
                department: chance.pickone(DEPARTMENTS),
                email: name.toLowerCase().replace(' ', '.') + '@business.com'
            });
        }
    }
}