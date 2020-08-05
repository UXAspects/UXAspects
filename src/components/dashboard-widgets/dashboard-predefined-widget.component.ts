import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ux-predefined-widget',
    templateUrl: './dashboard-predefined-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPredefinedWidgetComponent {
    constructor() {}
}
