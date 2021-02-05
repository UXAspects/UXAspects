import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {ActionConfig, ActionStatus, DashboardLayoutData, DashboardOptions, SelectConfig} from '@ux-aspects/ux-aspects';

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

    layout: DashboardLayoutData[];

    status: Readonly<ActionStatus> = {label: 'Waiting...', icon: 'radial'};

    actions: ActionConfig[] = [];

    handleActionChange(value: string) {
        this.status = {label: value, icon: 'close'};
    }

    tableHeader: ReadonlyArray<string> = ['1', '2', '3'];

    tableData: ReadonlyArray<any> = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
    ];

    selectOptions: ReadonlyArray<SelectConfig> = [
        {value: '0', label: 'Zero', icon: 'close'},
        {value: '1', label: 'One', icon: 'radial'},
    ];

    loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget elit libero. Praesent placerat iaculis urna, ac iaculis ipsum consectetur quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec faucibus magna, vel condimentum elit. Mauris auctor purus ut risus mattis, non pharetra sem ornare. Etiam interdum elementum elit, ut vulputate eros vestibulum nec. Fusce sed odio finibus justo mattis aliquam. Curabitur pulvinar, elit sit amet mollis feugiat, augue justo consectetur augue, sed elementum metus orci ac risus. Mauris elementum, tellus malesuada porttitor convallis, ligula ligula pulvinar diam, vitae ornare sapien velit at nulla.';

    @ViewChild('iconDecline') iconDecline: TemplateRef<any>;

    ngAfterViewInit() {
        this.actions.push(
            {value: 'accept', label: 'Accept', icon: 'active'},
            {value: 'decline', label: 'Decline', iconTemplate: this.iconDecline}
        );
    }
}
