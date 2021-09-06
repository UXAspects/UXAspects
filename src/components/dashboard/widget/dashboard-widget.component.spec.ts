import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from './dashboard-widget.component';

class MockDashboardService extends DashboardService {
    resizeWidget = jasmine.createSpy();
    renderDashboard = jasmine.createSpy();
}

describe('Dashboard Widget', () => {
    let component: DashboardWidgetComponent;
    let fixture: ComponentFixture<DashboardWidgetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: DashboardService, useClass: MockDashboardService }],
            declarations: [DashboardWidgetComponent],
        }).compileComponents();
    });

    it('should not attempt to resize a widget before the layout has been set', () => {
        const dashboardService = TestBed.inject(DashboardService);
        component.ngOnChanges({
            colSpan: new SimpleChange(undefined, 1, true),
        });

        expect(dashboardService.resizeWidget).not.toHaveBeenCalled();
        expect(dashboardService.renderDashboard).not.toHaveBeenCalled();
    });
});
