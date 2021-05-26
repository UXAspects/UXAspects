import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DashboardComponent, DashboardLayoutData, DashboardOptions } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'dashboard-layout-app',
    templateUrl: './can-move-layout.testpage.component.html',
    styleUrls: ['./can-move-layout.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanMoveLayoutTestPageComponent {

    @ViewChild('dashboard') uxDashboard: DashboardComponent;

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    layout: ReadonlyArray<DashboardLayoutData>;
}
