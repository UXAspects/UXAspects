import {
    ChangeDetectionStrategy,
    Component,
    Input
} from '@angular/core';
import { TableWidgetConfig } from '../interfaces/table-widget';

@Component({
    selector: 'ux-dashboard-table-widget',
    templateUrl: './dashboard-table-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTableWidgetComponent implements TableWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @Input() header: ReadonlyArray<string> = [];
    @Input() data: ReadonlyArray<ReadonlyArray<string>> = [];
}
