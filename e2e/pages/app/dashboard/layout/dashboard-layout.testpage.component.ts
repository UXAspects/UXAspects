import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutData, DashboardOptions } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dashboard-layout-app',
    templateUrl: './dashboard-layout.testpage.component.html',
    styleUrls: ['./dashboard-layout.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutTestPageComponent {

    options: DashboardOptions = {
        columns: 3,
        padding: 10,
        rowHeight: 300,
        emptyRow: false,
        minWidth: 187
    };

    initialLayout: DashboardLayoutData[] = [
        { id: 'usage-widget', col: 0, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'service-widget', col: 1, row: 0, colSpan: 2, rowSpan: 1 }
    ];

    updatedLayout: DashboardLayoutData[] = [
        { id: 'usage-widget', col: 2, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'service-widget', col: 0, row: 0, colSpan: 2, rowSpan: 1 }
    ];

    layout$: BehaviorSubject<DashboardLayoutData[]> = new BehaviorSubject<DashboardLayoutData[]>(this.initialLayout);

    updateLayout(): void {
        this.layout$.next(this.updatedLayout);
    }
}
