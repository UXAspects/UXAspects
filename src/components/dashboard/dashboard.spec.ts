import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOptions } from './dashboard.component';
import { DashboardModule } from './dashboard.module';


@Component({
    selector: 'app-ux-dashboard',
    template: `
        <ux-dashboard
            [options]="options">
        </ux-dashboard>
    `
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

fdescribe('Dashboard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let nativeElement: HTMLElement;

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
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

})
