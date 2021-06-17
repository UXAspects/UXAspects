import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutData, DashboardOptions } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dashboard-layout-app',
    templateUrl: './dashboard-eight-column-layout.testpage.component.html',
    styleUrls: ['./dashboard-eight-column-layout.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEightColumnLayoutTestPageComponent {

    options: DashboardOptions = {
        columns: 8,
        padding: 10,
        rowHeight: 220,
        minWidth: 90
    };

    initialLayout: DashboardLayoutData[] = [
        { id: 'widget-1', col: 0, row: 0, colSpan: 2, rowSpan: 1 },
        { id: 'widget-2', col: 2, row: 0, colSpan: 6, rowSpan: 1 },
        { id: 'widget-3', col: 0, row: 1, colSpan: 4, rowSpan: 1 },
        { id: 'widget-4', col: 4, row: 1, colSpan: 1, rowSpan: 1 },
    ];

    initialLayoutAlt: DashboardLayoutData[] = [
        { id: 'widget-1', col: 0, row: 0, colSpan: 2, rowSpan: 1 },
        { id: 'widget-2', col: 2, row: 0, colSpan: 6, rowSpan: 1 },
        { id: 'widget-3', col: 1, row: 1, colSpan: 4, rowSpan: 1 },
        { id: 'widget-4', col: 5, row: 1, colSpan: 1, rowSpan: 1 },
    ];

    flippedLayout: DashboardLayoutData[] = [
        { id: 'widget-1', col: 6, row: 0, colSpan: 2, rowSpan: 1 },
        { id: 'widget-2', col: 0, row: 0, colSpan: 6, rowSpan: 1 },
        { id: 'widget-3', col: 4, row: 1, colSpan: 4, rowSpan: 1 },
        { id: 'widget-4', col: 3, row: 1, colSpan: 1, rowSpan: 1 },
    ];

    flippedLayoutAlt: DashboardLayoutData[] = [
        { id: 'widget-1', col: 6, row: 0, colSpan: 2, rowSpan: 1 },
        { id: 'widget-2', col: 0, row: 0, colSpan: 6, rowSpan: 1 },
        { id: 'widget-3', col: 3, row: 1, colSpan: 4, rowSpan: 1 },
        { id: 'widget-4', col: 2, row: 1, colSpan: 1, rowSpan: 1 },
    ];

    layout$: BehaviorSubject<DashboardLayoutData[]> = new BehaviorSubject<DashboardLayoutData[]>(this.initialLayout);

    initLayoutAlt(): void {
        this.layout$.next(this.initialLayoutAlt);
    }

    flipLayout(): void {
        this.layout$.next(this.flippedLayout);
    }

    flipLayoutAlt(): void {
        this.layout$.next(this.flippedLayoutAlt);
    }
}
