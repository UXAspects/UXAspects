import { Component, Input } from '@angular/core';
import { DataWidgetConfig } from '../interfaces/data-widget';

@Component({
    selector: 'ux-dashboard-table-widget',
    templateUrl: './dashboard-table-widget.component.html',
})
export class DashboardTableWidgetComponent implements DataWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @Input() header: ReadonlyArray<any> = [];
    @Input() data: ReadonlyArray<ReadonlyArray<any>> = [];
    @Input() editable: boolean = false;

    constructor() {

    }
}
