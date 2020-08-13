import {
    ChangeDetectionStrategy,
    Component,
    Input
} from '@angular/core';
import { PredefinedWidgetConfig } from '../interfaces/predefined-widget.interface';
import { TableWidgetConfig } from '../interfaces/table-widget.interface';

@Component({
    selector: 'ux-dashboard-table-widget',
    templateUrl: './dashboard-table-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTableWidgetComponent implements PredefinedWidgetConfig, TableWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @Input() header: ReadonlyArray<string> = [];
    @Input() data: ReadonlyArray<ReadonlyArray<string>> = [];
    @Input() resizable: boolean = false;
}
