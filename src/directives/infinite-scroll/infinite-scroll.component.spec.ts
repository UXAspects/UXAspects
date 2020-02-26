import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollModule } from './infinite-scroll.module';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];


@Component({
    template: `<div class="row">
                    <div class="col-md-6 col-sm-12">
                        <input id="filter" type="text" class="form-control" placeholder="Filter"
                            [ngModel]="filterText | async" (ngModelChange)="filterText.next($event)">
                    </div>
                </div>
                <div class="row m-t-sm">
                    <div class="col-md-6 col-sm-12">

                        <div class="employee-list"
                            [uxInfiniteScroll]="loadCallback"
                            [(collection)]="loadedEmployees"
                            [filter]="debouncedFilterText | async"
                            [pageSize]="pageSize"
                            [loadOnScroll]="loadOnScroll">

                            <ol id="employees">
                                <li *ngFor="let employee of loadedEmployees" class="employee-item">
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

                            <button id="button1" *uxInfiniteScrollLoadButton type="button"
                                class="btn btn-link button-primary employee-load-more">Load more</button>

                            <div id="loading" *uxInfiniteScrollLoading class="employee-loading">
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
            }, 200);
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

fdescribe('Directive - Infinite Scroll', () => {
    let component: InfiniteScrollTestComponent;
    let fixture: ComponentFixture<InfiniteScrollTestComponent>;
    let nativeElement: HTMLElement;
    let filterInput: HTMLInputElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InfiniteScrollModule, FormsModule],
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