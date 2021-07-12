import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardModule} from '../../dashboard';
import {DashboardPredefinedWidgetsModule} from '../dashboard-predefined-widgets.module';
import {ActionConfig, ActionStatus} from '../interfaces/actions-widget.interface';
import {DashboardActionsWidgetComponent} from './dashboard-actions-widget.component';


const status: ActionStatus = {label: 'Waiting...', icon: 'radial'};

@Component({
    selector: 'ux-actions-widget-test-component',
    template: `
        <ux-dashboard>
            <ux-dashboard-actions-widget id="widget-actions" name="Actions Widget" heading="Actions Widget"
                                         fixedMode="false" colSpan="3" rowSpan="4"
                                         [status]="status" [actions]="actions">
                <ng-template #iconDecline>
                    <span class="custom-icon"><b>X</b></span>
                </ng-template>
            </ux-dashboard-actions-widget>
        </ux-dashboard>
    `
})
export class DashboardActionsWidgetTestComponent implements AfterViewInit {
    status: ActionStatus = status;
    actions: ReadonlyArray<ActionConfig> = [];

    @ViewChild(DashboardActionsWidgetComponent) widget: DashboardActionsWidgetComponent;
    @ViewChild('iconDecline') iconDecline: TemplateRef<void>;

    ngAfterViewInit() {
        this.actions = [
            {value: 'accept', label: 'Accept', icon: 'active'},
            {value: 'decline', label: 'Decline', iconTemplate: this.iconDecline}
        ];
    }
}

describe('Actions Widget', () => {
    let component: DashboardActionsWidgetTestComponent;
    let fixture: ComponentFixture<DashboardActionsWidgetTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, DashboardPredefinedWidgetsModule],
            declarations: [DashboardActionsWidgetTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardActionsWidgetTestComponent);
        fixture.componentInstance.ngAfterViewInit();
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
        expect(component.widget.id).toEqual('widget-actions');
        expect(component.widget.name).toEqual('Actions Widget');
        expect(component.widget.heading).toEqual('Actions Widget');

        expect(component.widget.status).toEqual(status);
        expect(component.widget.actions[0]).toEqual({value: 'accept', label: 'Accept', icon: 'active'});
        expect(component.widget.actions[1].value).toEqual('decline');
        expect(component.widget.actions[1].label).toEqual('Decline');
        expect(component.widget.actions[1].icon).toBeUndefined();
    });
});
