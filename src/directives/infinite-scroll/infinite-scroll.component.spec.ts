import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollModule } from './infinite-scroll.module';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    template: `<div [uxInfiniteScroll]="load"
                    [filter]="filterText"
                    [pageSize]="20"
                    [loadOnScroll]="false">
                </div>
    `
})
export class InfiniteScrollTestComponent {

    filterText: any;

    load(pageNum: number, pageSize: number, filter: any): any[] {
        return [];
    }

}

describe('Directive - Infinite Scroll', () => {
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
        fixture.detectChanges();
    });

    it ('should initially call load with filter value of "" if filter input value is undefined', async() => {

        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
    });

    it ('should call load with filter value of "" if filter input value changes to null', async() => {

        component.filterText = null;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
    });

    it ('should call load with filter value of "some string" if filter input value changes to string', async() => {

        component.filterText = 'some string';

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, 'some string');
    });

    it ('should call load with filter value of 10 if filter input value changes to number', async() => {

        component.filterText = 10;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, 10);
    });

    it ('should call load with filter value of true if filter input value changes to boolean', async() => {

        component.filterText = true;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, true);
    });

    it ('should call load with filter value of { name: "somebody" } if filter input value changes to object', async() => {

        component.filterText = { name: 'somebody' };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, { name: 'somebody' });
    });
});