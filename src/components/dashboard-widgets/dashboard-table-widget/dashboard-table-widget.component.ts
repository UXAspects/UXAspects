import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-dashboard-table-widget',
    templateUrl: './dashboard-table-widget.component.html',
})
export class DashboardTableWidgetComponent {
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
