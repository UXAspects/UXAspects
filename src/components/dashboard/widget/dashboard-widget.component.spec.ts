///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

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
