import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import 'chance';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const chance = new Chance();

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText.pipe(debounceTime(500));
    allEmployees: any[] = [];
    loadedEmployees: any[] = [];
    loadCallback = this.load.bind(this);
    loadOnScroll = true;
    loading = false;
    pageSize = 20;
    totalItems = 111;

    load(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
        this._liveAnnouncer.announce('Loading more items at the end of the list, please wait.');
        let promise = new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.allEmployees
                    .filter((e) => this.isFilterMatch(e))
                    .slice(pageStart, pageStart + pageSize);
                this._liveAnnouncer.announce(`${newItems.length} items loaded at the end of the list.`);
                resolve(newItems);
            }, 2000);
        });

        return promise;
    }

    isFilterMatch(e: any): boolean {
        const normalisedFilter = this.filterText.getValue().toLowerCase();
        return (e.name.toLowerCase().indexOf(normalisedFilter) >= 0);
    }

    constructor(private _liveAnnouncer: LiveAnnouncer) {
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