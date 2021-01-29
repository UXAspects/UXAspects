import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardModule } from '../../dashboard';
import { DashboardPredefinedWidgetsModule } from '../dashboard-predefined-widgets.module';
import { ActionConfig, ActionStatus } from '../interfaces/actions-widget.interface';

@Component({
    selector: 'ux-actions-widget-test-component',
    template: `<ux-dashboard>
                    <ux-dashboard-actions-widget class="widget"
                                                 id="widget-actions"
                                                 name="Actions Widget"
                                                 heading="Actions Widget"
                                                 [fixedMode]="false"
                                                 [status]="status"
                                                 [actions]="actions">
                        <ng-template #iconDecline>
                            <span class="custom-icon"><b>X</b></span>
                        </ng-template>
                    </ux-dashboard-actions-widget>
               </ux-dashboard>
    `
})
export class DashboardActionsWidgetTestComponent implements AfterViewInit {
    status: ActionStatus = { label: 'Waiting...', icon: 'radial' };
    actions: ActionConfig[] = [];

    @ViewChild('iconDecline') iconDecline: TemplateRef<any>;

    ngAfterViewInit() {
        this.actions.push(
            { value: 'accept', label: 'Accept', icon: 'active' },
            { value: 'decline', label: 'Decline', iconTemplate: this.iconDecline }
        );
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
    });
});
