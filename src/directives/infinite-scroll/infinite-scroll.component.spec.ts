import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollModule } from './infinite-scroll.module';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import 'chance';

const chance = new Chance();

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];


@Component({
    template: `<div class="row">
                    <div class="col-md-6 col-sm-12">
                        <input type="text"
                            aria-label="Filter the employee list"
                            aria-controls="employee-infinite-scroll-list"
                            class="form-control"
                            placeholder="Filter"
                            [ngModel]="filterText | async" (ngModelChange)="filterText.next($event)">
                    </div>
                </div>
                <div class="row m-t-sm">
                    <div class="col-md-6 col-sm-12">

                        <div id="employee-infinite-scroll-list" class="employee-list"
                            [uxInfiniteScroll]="loadCallback"
                            [(collection)]="loadedEmployees"
                            [filter]="debouncedFilterText | async"
                            [pageSize]="pageSize"
                            [loadOnScroll]="loadOnScroll"
                            (loading)="loading = true"
                            (loaded)="loading = false"
                            (loadError)="loading = false">

                            <ol [attr.aria-busy]="loading" aria-label="Employee list with infinite scrolling">
                                <li *ngFor="let employee of loadedEmployees"
                                    [attr.aria-setsize]="totalItems"
                                    [attr.aria-posinset]="employee.position"
                                    class="employee-item">

                                    <div class="employee-details">
                                        <div>
                                            <span class="employee-name">{{employee.name}}</span>
                                            <span class="employee-department">({{employee.department}})</span>
                                        </div>
                                        <div>
                                            <span class="employee-email">{{employee.email}}</span>
                                        </div>
                                    </div>
                                    <div class="employee-id">{{employee.id}}</div>

                                </li>
                            </ol>

                            <div *uxInfiniteScrollLoading class="employee-loading">
                                <div class="spinner spinner-accent spinner-bounce-middle"></div>
                                <div>Loading...</div>
                            </div>

                        </div>

                    </div>
                </div>
    `
})
export class InfiniteScrollTestComponent {

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText.pipe(debounceTime(500));
    allEmployees: any[] = [];
    loadedEmployees: any[] = [];
    loadCallback = this.load.bind(this);
    loadOnScroll = false;
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

describe('Directive - Infinite Scroll', () => {
    let component: InfiniteScrollTestComponent;
    let fixture: ComponentFixture<InfiniteScrollTestComponent>;
    let nativeElement: HTMLElement;
    let filterInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InfiniteScrollModule],
            declarations: [InfiniteScrollTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfiniteScrollTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        filterInput = nativeElement.querySelector<HTMLInputElement>('input');
        fixture.detectChanges();

    });

    it ('should initialise correctly', () => {

        expect(component).toBeTruthy();
    });

})