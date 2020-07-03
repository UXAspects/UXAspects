import { Component } from '@angular/core';
import { DashboardOptions, DashboardLayoutData } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'dashboard-app',
    templateUrl: './dashboard.testpage.component.html',
    styleUrls: ['./dashboard.testpage.component.css']
})
export class DashboardTestPageComponent {

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    adjustedOptions: DashboardOptions = {
        columns: 5,
        padding: 20,
        rowHeight: 250,
        emptyRow: false,
        minWidth: 187
    };

    layout: ReadonlyArray<DashboardLayoutData>;

    widget1Enabled = true;

    changeOptions(): void {
        this.options = this.adjustedOptions;
    }

    setLayout(): void {
        this.layout = [
            { id: 'analytics-1-widget', col: 0, row: 0, colSpan: 4, rowSpan: 2},
            { id: 'subscription-widget', col: 0, row: 2, colSpan: 2, rowSpan: 1},
            { id: 'users-widget', col: 2, row: 2, colSpan: 1, rowSpan: 1},
            { id: 'alert-widget', col: 3, row: 2, colSpan: 1, rowSpan: 1}
        ];
    }

    onLayoutChange(): void {

    }
}
