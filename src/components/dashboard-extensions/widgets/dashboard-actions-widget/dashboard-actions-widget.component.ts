import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-dashboard-actions-widget',
    templateUrl: './dashboard-actions-widget.component.html',
})
export class DashboardActionsWidgetComponent {
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() heading: string = '';
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() status: { state: string, icon: string } = { state: '-', icon: 'radial' };
    @Input() actions: { name: string, icon: string, action: Function }[] = [];
    @Input() buttons: Array<HTMLElement> = [];

    click(fn: Function) {
        fn();
    }
}
