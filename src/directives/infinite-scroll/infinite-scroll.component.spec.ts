import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { InfiniteScrollModule } from './infinite-scroll.module';

@Component({
    template: `<div [uxInfiniteScroll]="load"
                    [filter]="filterText"
                    [pageSize]="20"
                    [loadOnScroll]="loadOnScroll">
                </div>
    `
})
export class InfiniteScrollTestComponent {

    filterText: any;
    loadOnScroll: boolean = false;

    @ViewChild(InfiniteScrollDirective) infiniteScrollDirective: InfiniteScrollDirective;

    load(pageNum: number, pageSize: number, filter: any): any[] {
        const items: string[] = [];
        for (let idx = pageNum * 20; idx < (pageNum + 1) * 20; idx++) {
            items.push(`Item ${idx}`);
        }
        return items;
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

    it ('should initially call load with filter value of "" if filter input value is undefined', () => {
        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
        expect(loadSpy).toHaveBeenCalledTimes(1);
    });

    it ('should call load with filter value of "" if filter input value changes to null', async () => {

        component.filterText = null;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, '');
        expect(loadSpy).toHaveBeenCalledTimes(1);
    });

    it ('should call load with filter value of "some string" if filter input value changes to string', async () => {

        component.filterText = 'some string';

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, 'some string');
        expect(loadSpy).toHaveBeenCalledTimes(2);
    });

    it ('should call load with filter value of 10 if filter input value changes to number', async () => {

        component.filterText = 10;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, 10);
        expect(loadSpy).toHaveBeenCalledTimes(2);
    });

    it ('should call load with filter value of true if filter input value changes to boolean', async () => {

        component.filterText = true;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, true);
        expect(loadSpy).toHaveBeenCalledTimes(2);
    });

    it ('should call load with filter value of { name: "somebody" } if filter input value changes to object', async () => {

        component.filterText = { name: 'somebody' };

        fixture.detectChanges();
        await fixture.whenStable();

        expect(loadSpy).toHaveBeenCalledWith(0, 20, { name: 'somebody' });
        expect(loadSpy).toHaveBeenCalledTimes(2);
    });

    // Test Case for https://portal.digitalsafe.net/browse/EL-4093
    it('should not attempt to load a subsequent page if the element is invisible', fakeAsync(async () => {

        // hide the component so it has a height of 0 but is still within the DOM
        const nativeElement = fixture.nativeElement as HTMLElement;
        nativeElement.style.display = 'none';

        component.loadOnScroll = true;
        component.filterText = { name: 'somebody' };
        fixture.detectChanges();
        await fixture.whenStable();

        loadSpy.calls.reset();

        // we trigger a `check` which will attempt to load a page however this should never result
        // in a call to the `load` function as the typeahead is not visible
        component.infiniteScrollDirective.check();

        // load requests are debounced by 200ms
        tick(200);

        expect(loadSpy).not.toHaveBeenCalled();
    }));
});

@Component({
    template: `
        <div
            style="height: 200px; overflow: auto;"
            [uxInfiniteScroll]="load"
            [pageSize]="20"
            [loadOnScroll]="true"
        >
            <!-- Increase scroll height -->
            <div style="height: 220px;"></div>
        </div>
    `,
})
export class InfiniteScrollTestDelayComponent {
    @ViewChild(InfiniteScrollDirective) infiniteScrollDirective: InfiniteScrollDirective;

    load(pageNum: number): Promise<any[]> {
        const items = [];
        return new Promise(resolve => {
            setTimeout(() => {
                for (let idx = pageNum * 20; idx < (pageNum + 1) * 20; idx++) {
                    items.push(`Item ${idx}`);
                }
                resolve(items);
            }, 2000);
        });
    }
}

fdescribe('Directive - Infinite Scroll Promise', () => {
    let component: InfiniteScrollTestDelayComponent;
    let fixture: ComponentFixture<InfiniteScrollTestDelayComponent>;
    let loadSpy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InfiniteScrollModule, FormsModule],
            declarations: [InfiniteScrollTestDelayComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InfiniteScrollTestDelayComponent);
        component = fixture.componentInstance;
        loadSpy = spyOn(component, 'load').and.callThrough();
        fixture.detectChanges();
    });

    // checking if promise resolves twice
    it('should resolve the load function when reset is called during load', () => {
        expect(loadSpy).toHaveBeenCalledTimes(1);
    });

    it('should allow loading to be triggered after reset, regardless if there are any pending requests', fakeAsync(() => {
        component.infiniteScrollDirective.reset(true);
        component.infiniteScrollDirective.check();

        // check adds a 200ms auditTime delay
        tick(200);

        expect(loadSpy).toHaveBeenCalledTimes(2);

        flush();
    }));
});