import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PredefinedWidgetConfig } from '../interfaces/predefined-widget';
import { ActionConfig, ActionStatus, ActionsWidgetConfig } from '../interfaces/actions-widget';

@Component({
    selector: 'ux-dashboard-actions-widget',
    templateUrl: './dashboard-actions-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardActionsWidgetComponent implements PredefinedWidgetConfig, ActionsWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @Input() status: ActionStatus = { label: '-', icon: 'radial' };
    @Input() actions: ReadonlyArray<ActionConfig>;
}
