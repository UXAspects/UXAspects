import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TemplateRef
} from '@angular/core';
import { ActionConfig, ActionsWidgetConfig } from '../interfaces/actions-widget';

@Component({
    selector: 'ux-dashboard-actions-widget',
    templateUrl: './dashboard-actions-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardActionsWidgetComponent implements ActionsWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @Input() status: { label: string, icon: string | TemplateRef<any> } = { label: '-', icon: 'radial' };
    @Input() actions: ReadonlyArray<ActionConfig>;
}
