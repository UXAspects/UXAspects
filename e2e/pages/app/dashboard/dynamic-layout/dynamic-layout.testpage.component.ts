import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardOptions } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'dashboard-layout-app',
    templateUrl: './dynamic-layout.testpage.component.html',
    styleUrls: ['./dynamic-layout.testpage.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
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

    changeWidget1(row: number, column: number): void {
        this.widget1RowSpan += row;
        this.widget1ColSpan += column;
    }

    changeWidget4(row: number, column: number): void {
        this.widget4RowSpan += row;
        this.widget4ColSpan += column;
    }


}
