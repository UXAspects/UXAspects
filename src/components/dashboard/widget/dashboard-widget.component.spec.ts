import { Injectable, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from './dashboard-widget.component';

@Injectable()
class MockDashboardService extends DashboardService {
  resizeWidget = jasmine.createSpy();
  renderDashboard = jasmine.createSpy();
}

describe('Dashboard Widget', () => {
  let fixture: ComponentFixture<DashboardWidgetComponent>;
  let component: DashboardWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWidgetComponent],
      providers: [{ provide: DashboardService, useClass: MockDashboardService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardWidgetComponent);
    component = fixture.componentInstance;
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
