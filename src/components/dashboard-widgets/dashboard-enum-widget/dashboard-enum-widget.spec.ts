import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardModule } from '../../dashboard';
import { DashboardPredefinedWidgetsModule } from '../dashboard-predefined-widgets.module';
import { EnumConfig } from '../interfaces/enum-widget.interface';
import { DashboardEnumWidgetComponent } from './dashboard-enum-widget.component';

@Component({
    selector: 'app-ux-enum-widget',
    template: `<ux-dashboard>
                    <ux-dashboard-enum-widget #widget
                                              class="widget"
                                              id="widget-enum"
                                              [name]="'Enum Widget'"
                                              [heading]="'Enum Widget'"
                                              [fixedMode]="false"
                                              [enums]="enums"
                                              [value]="0">
                    </ux-dashboard-enum-widget>
               </ux-dashboard>
    `
})
export class DashboardEnumWidgetTestComponent {
    enums: ReadonlyArray<EnumConfig> = [
        { value: 0, label: 'Zero', icon: 'close' },
        { value: 1, label: 'One', icon: 'radial' },
    ];

    @ViewChild('widget') widget: DashboardEnumWidgetComponent;
}

describe('Enum Widget', () => {
    let component: DashboardEnumWidgetTestComponent;
    let fixture: ComponentFixture<DashboardEnumWidgetTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, DashboardPredefinedWidgetsModule],
            declarations: [DashboardEnumWidgetTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardEnumWidgetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });
});
