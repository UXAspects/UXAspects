import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app',
    templateUrl: './infinite-scroll-fullscreen.testpage.component.html',
    styleUrls: ['./infinite-scroll-fullscreen.testpage.component.css']
})
export class InfiniteScrollFullscreenTestPageComponent {

    scrollElement = document.documentElement;

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText.pipe(debounceTime(50));

    allEmployees = [];
    loadedEmployees = [];

    loadCallback = this.load.bind(this);

    pageSize = 20;

    loadOnScroll: boolean = true;

    loading: boolean = false;
    exhausted: boolean = false;

    load(pageNum: number, pageSize: number): Promise<unknown[]> {
        const promise = new Promise<unknown[]>((resolve) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.allEmployees
                    .filter((e) => this.isFilterMatch(e))
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            }, 250);
        });

        return promise;
    }

    isFilterMatch(e): boolean {
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
