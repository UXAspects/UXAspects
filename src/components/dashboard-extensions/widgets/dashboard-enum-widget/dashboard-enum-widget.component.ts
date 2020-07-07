import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-dashboard-enum-widget',
    templateUrl: './dashboard-enum-widget.component.html',
})
export class DashboardEnumWidgetComponent {
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() heading: string = '';
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() text: string = '';
    @Input() editable: boolean = false;

    constructor() {

    }
}
