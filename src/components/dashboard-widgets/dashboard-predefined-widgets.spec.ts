import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardModule } from '../dashboard/index';
import { DashboardPredefinedWidgetsModule } from './dashboard-predefined-widgets.module';

@Component({
    selector: 'app-ux-predefined-widget',
    template: `<ux-dashboard>
                    <ux-predefined-widget id="widget-predefined"
                                          [name]="'Predefined Widget'"
                                          [heading]="'Predefined Widget'"
                                          [fixedMode]="false">
                        <p class="text">Text</p>
                    </ux-predefined-widget>
               </ux-dashboard>
    `
})
export class DashboardPredefinedWidgetComponent {}

describe('Predefined Widget', () => {
    let component: DashboardPredefinedWidgetComponent;
    let fixture: ComponentFixture<DashboardPredefinedWidgetComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, DashboardPredefinedWidgetsModule],
            declarations: [DashboardPredefinedWidgetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardPredefinedWidgetComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });
});
