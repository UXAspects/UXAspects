import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardOptions, DashboardLayoutData } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dashboard-app',
    templateUrl: './dashboard.testpage.component.html',
    styleUrls: ['./dashboard.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
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

    initialLayout: DashboardLayoutData[] = [
        { id: 'usage-widget', col: 0, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'service-widget', col: 1, row: 0, colSpan: 2, rowSpan: 1 }
    ];

    updatedLayout: DashboardLayoutData[] = [
        { id: 'usage-widget', col: 3, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'service-widget', col: 0, row: 0, colSpan: 2, rowSpan: 1 }
    ];

    layout$: BehaviorSubject<DashboardLayoutData[]> = new BehaviorSubject<DashboardLayoutData[]>(this.initialLayout);

    widget1Enabled = true;

    changeOptions(): void {
        this.options = this.adjustedOptions;
    }

    updateLayout(): void {
        this.layout$.next(this.updatedLayout);
    }
}
