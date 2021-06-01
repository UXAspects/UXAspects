import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DashboardComponent, DashboardLayoutData, DashboardOptions } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'dashboard-layout-app',
    templateUrl: './pinned-layout.testpage.component.html',
    styleUrls: ['./pinned-layout.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinnedLayoutTestPageComponent {

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
