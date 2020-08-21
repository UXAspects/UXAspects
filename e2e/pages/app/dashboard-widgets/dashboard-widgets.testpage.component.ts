import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import {
    ActionConfig,
    ActionStatus
} from '../../../../src/components/dashboard-widgets/interfaces/actions-widget.interface';
import { EnumConfig } from '../../../../src/components/dashboard-widgets/interfaces/enum-widget.interface';
import { DashboardLayoutData, DashboardOptions } from '../../../../src/components/dashboard';

@Component({
    selector: 'dashboard-app',
    templateUrl: './dashboard-widgets.testpage.component.html',
    styleUrls: ['./dashboard-widgets.testpage.component.css']
})
export class DashboardWidgetsTestpageComponent implements AfterViewInit {
    fixedMode: boolean = false;
    textWidgetEditable: boolean = true;
    private _dashboardPadding: number = 10;

    get dashboardPadding(): number {
        return this._dashboardPadding;
    }

    set dashboardPadding(value: number) {
        this._dashboardPadding = value;
        this.options.padding = value;
    }

    options: DashboardOptions = {
        columns: 4,
        padding: this.dashboardPadding,
        rowHeight: 110,
        emptyRow: false,
        minWidth: 187
    };

    layout: DashboardLayoutData[] = [
        { id: 'widget-actions', col: 0, row: 0, colSpan: 2, rowSpan: 1 },
        { id: 'widget-enum', col: 0, row: 1, colSpan: 2, rowSpan: 1 },
        { id: 'widget-table', col: 2, row: 0, colSpan: 2, rowSpan: 2 },
        { id: 'widget-text', col: 0, row: 2, colSpan: 4, rowSpan: 1 }
    ];

    status: ActionStatus = { label: 'Waiting...', icon: 'radial' };

    actions: ActionConfig[] = [];

    handleActionChange(e: string) {
        alert(`action clicked: ${e}`);
    }

    tableHeader: ReadonlyArray<string> = ['1', '2', '3'];

    tableData: ReadonlyArray<any> = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
    ];

    enums: ReadonlyArray<EnumConfig> = [
        { value: '0', label: 'Zero', icon: 'close' },
        { value: '1', label: 'One', icon: 'radial' },
    ];

    loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget elit libero. Praesent placerat iaculis urna, ac iaculis ipsum consectetur quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec faucibus magna, vel condimentum elit. Mauris auctor purus ut risus mattis, non pharetra sem ornare. Etiam interdum elementum elit, ut vulputate eros vestibulum nec. Fusce sed odio finibus justo mattis aliquam. Curabitur pulvinar, elit sit amet mollis feugiat, augue justo consectetur augue, sed elementum metus orci ac risus. Mauris elementum, tellus malesuada porttitor convallis, ligula ligula pulvinar diam, vitae ornare sapien velit at nulla.';

    @ViewChild('iconAccept') iconAccept: TemplateRef<any>;

    ngAfterViewInit() {
        this.actions.push(
            { value: 'accept', label: 'Accept', iconTemplate: this.iconAccept },
            { value: 'decline', label: 'Decline', icon: 'close' }
        );
    }
}
