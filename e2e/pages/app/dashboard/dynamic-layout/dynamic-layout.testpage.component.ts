import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutData, DashboardOptions } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dashboard-layout-app',
    templateUrl: './dynamic-layout.testpage.component.html',
    styleUrls: ['./dynamic-layout.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DynamicLayoutTestPageComponent {

    widget1ColSpan = 2;
    widget1RowSpan = 1;

    widget4ColSpan = 4;
    widget4RowSpan = 2;

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
        minWidth: 90
    };

    initialLayout: DashboardLayoutData[] = [
        { id: 'widget-1', col: 0, row: 0, colSpan: 2, rowSpan: 1 },
        { id: 'widget-2', col: 2, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'widget-3', col: 3, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'widget-4', col: 0, row: 1, colSpan: 4, rowSpan: 2, minColSpan: 4, minRowSpan: 2 },
    ];

    alternativeLayout: DashboardLayoutData[] = [
        { id: 'widget-1', col: 0, row: 0, colSpan: 3, rowSpan: 2 },
        { id: 'widget-2', col: 3, row: 0, colSpan: 1, rowSpan: 1 },
        { id: 'widget-3', col: 3, row: 1, colSpan: 1, rowSpan: 1 },
        { id: 'widget-4', col: 0, row: 2, colSpan: 4, rowSpan: 2 },
    ];

    layout$: BehaviorSubject<DashboardLayoutData[]> = new BehaviorSubject<DashboardLayoutData[]>(this.initialLayout);

    changeWidget1(row: number, column: number): void {
        this.widget1RowSpan += row;
        this.widget1ColSpan += column;
    }

    changeWidget4(row: number, column: number): void {
        this.widget4RowSpan += row;
        this.widget4ColSpan += column;
    }

    changeLayout(): void {
        this.widget1ColSpan = 3;
        this.widget1RowSpan = 2;
        this.widget4ColSpan = 4;
        this.widget4RowSpan = 2;

        this.layout$.next(this.alternativeLayout);
    }
}
