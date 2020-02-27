import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InfiniteScrollModule } from './infinite-scroll.module';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    template: `<div class="row">
                    <div class="col-md-6 col-sm-12">
                        <input id="filter" type="text" class="form-control" placeholder="Filter"
                            [(ngModel)]="filterText">
                    </div>
                </div>
                <div class="row m-t-sm">
                    <div class="col-md-6 col-sm-12">

                        <div class="employee-list"
                            [uxInfiniteScroll]="load"
                            [filter]="filterText"
                            [pageSize]="pageSize"
                            [loadOnScroll]="loadOnScroll">

                        </div>

                    </div>
                </div>
    `
})
export class InfiniteScrollTestComponent {

    filterText: string;
    pageSize = 20;
    loadOnScroll: boolean = false;
    loading: boolean = false;
    exhausted: boolean = false;

    load(pageNum: number, pageSize: number, filter: any): any[] {
        return [];
    }

}

fdescribe('Directive - Infinite Scroll', () => {
    let component: InfiniteScrollTestComponent;
    let fixture: ComponentFixture<InfiniteScrollTestComponent>;
    let loadSpy: jasmine.Spy;

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
        loadSpy = spyOn(component, 'load').and.callThrough();
        component.filterText = undefined;
        fixture.detectChanges();
    });

    it ('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it ('should initially load with a filterText value of ""', async() => {
        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
    });

    it ('should call load if filter input value changes to "filter"', async() => {

        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');

        component.filterText = 'filter';

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, 'filter');
    });

    it ('should call load with filter value of "" if filter input value changes to null', async() => {
        component.filterText = null;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
    });

    it ('should call load with filter value of "" if filter input value changes to undefined', async() => {
        component.filterText = undefined;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
    });

});