import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOptions } from './dashboard.component';
import { DashboardModule } from './dashboard.module';


@Component({
    selector: 'app-ux-dashboard',
    template: `<ux-dashboard [options]="options"></ux-dashboard>`
})
export class DashboardComponent {

    options: DashboardOptions  = {
        columns: 3,
        padding: 10,
        rowHeight: 300,
        emptyRow: false,
        minWidth: 187
    };
}

describe('Dashboard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule],
            declarations: [DashboardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should change columns option if columns option adjusted', async() => {
        expect(component.options.columns).toBe(3);

        component.options.columns = 6;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.columns).toBe(6);
    });

    it('should change padding option if padding option adjusted', async() => {
        expect(component.options.padding).toBe(10);

        component.options.padding = 20;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.padding).toBe(20);
    });

    it('should change rowHeight option if rowHeight option adjusted', async() => {
        expect(component.options.rowHeight).toBe(300);

        component.options.rowHeight = 600;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.rowHeight).toBe(600);
    });

    it('should change minWidth option if minWidth option adjusted', async() => {
        expect(component.options.minWidth).toBe(187);

        component.options.minWidth = 100;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.minWidth).toBe(100);
    });

    it('should change emptyRow option if emptyRow option adjusted', async() => {
        expect(component.options.emptyRow).toBe(false);

        component.options.emptyRow = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.emptyRow).toBe(true);
    });
})
