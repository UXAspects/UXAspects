import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-dashboard-data-table-widget',
    templateUrl: './dashboard-data-table-widget.component.html',
})
export class DashboardDataTableWidgetComponent {
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() heading: string = '';
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() header: ReadonlyArray<any> = [];
    @Input() data: ReadonlyArray<any> = [];
    @Input() editable: boolean = false;

    constructor() {

    }
}
