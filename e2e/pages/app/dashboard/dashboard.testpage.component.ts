import { Component } from '@angular/core';
import { DashboardOptions } from '@ux-aspects/ux-aspects';

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

    widget1Enabled = true;

    changeOptions(): void {
        this.options = this.adjustedOptions;
    }

}
