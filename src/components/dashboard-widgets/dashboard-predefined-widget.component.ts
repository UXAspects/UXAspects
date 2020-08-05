import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PredefinedWidgetConfig } from "./interfaces/predefined-widget";

@Component({
    selector: 'ux-predefined-widget',
    templateUrl: './dashboard-predefined-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPredefinedWidgetComponent implements PredefinedWidgetConfig {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    constructor() {}
}
