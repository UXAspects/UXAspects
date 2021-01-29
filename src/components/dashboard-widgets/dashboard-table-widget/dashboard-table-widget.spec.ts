import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardModule } from '../../dashboard';
import { DashboardPredefinedWidgetsModule } from '../dashboard-predefined-widgets.module';

@Component({
    selector: 'app-ux-table-widget',
    template: `<ux-dashboard>
                    <ux-dashboard-table-widget class="widget"
                                               id="widget-table"
                                               name="Table Widget"
                                               heading="Table Widget"
                                               [fixedMode]="false"
                                               [header]="tableHeader"
                                               [data]="tableData">
                    </ux-dashboard-table-widget>
               </ux-dashboard>
    `
})
export class DashboardTableWidgetTestComponent {
    tableHeader: ReadonlyArray<string> = ['1', '2', '3'];
    tableData: ReadonlyArray<any> = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
    ];
}

describe('Table Widget', () => {
    let component: DashboardTableWidgetTestComponent;
    let fixture: ComponentFixture<DashboardTableWidgetTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, DashboardPredefinedWidgetsModule],
            declarations: [DashboardTableWidgetTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardTableWidgetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });
});
