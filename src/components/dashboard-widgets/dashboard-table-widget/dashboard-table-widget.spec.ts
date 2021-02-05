import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardModule} from '../../dashboard';
import {DashboardPredefinedWidgetsModule} from '../dashboard-predefined-widgets.module';
import {DashboardTableWidgetComponent} from './dashboard-table-widget.component';

const header = ['1', '2', '3'];

const data = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
];

@Component({
    selector: 'ux-table-widget-test-component',
    template: `
        <ux-dashboard>
            <ux-dashboard-table-widget id="widget-table" name="Table Widget" heading="Table Widget"
                                       fixedMode="false" colSpan="3" rowSpan="4"
                                       [header]="tableHeader" [data]="tableData">
            </ux-dashboard-table-widget>
        </ux-dashboard>
    `
})
export class DashboardTableWidgetTestComponent {
    tableHeader: ReadonlyArray<string> = header;
    tableData: ReadonlyArray<any> = data;
    @ViewChild(DashboardTableWidgetComponent) widget: DashboardTableWidgetComponent;
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
        expect(component.widget).toBeTruthy();
    });

    it('should set inputs correctly', () => {
        expect(component.widget.fixedMode).toEqual(false);
        expect(component.widget.colSpan).toEqual(3);
        expect(component.widget.rowSpan).toEqual(4);
        expect(component.widget.id).toEqual('widget-table');
        expect(component.widget.name).toEqual('Table Widget');
        expect(component.widget.heading).toEqual('Table Widget');

        expect(component.widget.header).toEqual(header);
        expect(component.widget.data).toEqual(data);
    });
});
