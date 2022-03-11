import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {ActionConfig, ActionStatus, DashboardOptions, SelectConfig} from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
    fixedMode: boolean = false;
    private _dashboardPadding: number = 8;

    get dashboardPadding(): number {
        return this._dashboardPadding;
    }

    set dashboardPadding(value: number) {
        this._dashboardPadding = value;

        this.options = {...this.options, padding: value};
    }

    options: DashboardOptions = {
        columns: 4,
        padding: this._dashboardPadding,
        rowHeight: 120,
        emptyRow: false,
        minWidth: 187
    };

    status: ActionStatus = {label: 'Pending', icon: 'radial'};

    actions: ActionConfig[] = [];

    tableHeader: ReadonlyArray<string> = ['Event', 'Time'];

    tableData: ReadonlyArray<string[]> = [
        ['Created', 'Jan 3, 9:23 AM'],
        ['Updated Title', 'Jan 3, 10:16 AM'],
        ['Assigned', 'Jan 3, 10:45 AM'],
        ['Resolved', 'Jan 5, 6:23 PM']
    ];

    selectOptions: ReadonlyArray<SelectConfig> = [
        {value: '0', label: 'Zero', icon: 'close'},
        {value: '1', label: 'One', icon: 'radial'},
    ];

    loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget elit libero. Praesent placerat iaculis urna, ac iaculis ipsum consectetur quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec faucibus magna, vel condimentum elit. Mauris auctor purus ut risus mattis, non pharetra sem ornare. Etiam interdum elementum elit, ut vulputate eros vestibulum nec. Fusce sed odio finibus justo mattis aliquam. Curabitur pulvinar, elit sit amet mollis feugiat, augue justo consectetur augue, sed elementum metus orci ac risus. Mauris elementum, tellus malesuada porttitor convallis, ligula ligula pulvinar diam, vitae ornare sapien velit at nulla.';
    loremIpsum2: string = this.loremIpsum + ' ' + this.loremIpsum;

    @ViewChild('iconDecline') iconDecline: TemplateRef<void>;

    ngAfterViewInit() {
        this.actions.push(
            {value: 'accept', label: 'Accept', icon: 'active'},
            {value: 'decline', label: 'Decline', iconTemplate: this.iconDecline}
        );
    }

    handleActionChange(action: string): void {
        this.status = (action === 'accept')
            ? {label: 'Accepted', icon: 'active'}
            : {label: 'Declined', iconTemplate: this.iconDecline};
    }
}
