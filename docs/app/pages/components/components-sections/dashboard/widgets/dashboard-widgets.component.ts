import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import {ActionConfig, ActionStatus, DashboardOptions, EnumConfig} from '@ux-aspects/ux-aspects';
import {BaseDocumentationSection} from '../../../../../components/base-documentation-section/base-documentation-section';
import {DocumentationSectionComponent} from '../../../../../decorators/documentation-section-component';
import {IPlayground} from '../../../../../interfaces/IPlayground';
import {IPlaygroundProvider} from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-dashboard-widgets',
    templateUrl: './dashboard-widgets.component.html',
    styleUrls: ['./dashboard-widgets.component.less']
})
@DocumentationSectionComponent('ComponentsDashboardWidgetsComponent')
export class ComponentsDashboardWidgetsComponent extends BaseDocumentationSection implements IPlaygroundProvider, AfterViewInit {
    fixedMode: boolean = false;
    textWidgetEditable: boolean = true;
    private _dashboardPadding: number = 5;

    get dashboardPadding(): number {
        return this._dashboardPadding;
    }

    set dashboardPadding(value: number) {
        this._dashboardPadding = value;

        this.options = {
            columns: 4,
            padding: value,
            rowHeight: 110,
            emptyRow: false,
            minWidth: 187
        };
    }

    options: DashboardOptions = {
        columns: 4,
        padding: this._dashboardPadding,
        rowHeight: 110,
        emptyRow: false,
        minWidth: 187
    };

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['DashboardModule', 'ColorServiceModule', 'SparkModule'],
            library: '@ux-aspects/ux-aspects'
        }, {
            library: 'chance'
        },
            {
                library: 'chart.js'
            },
            {
                imports: ['ChartsModule'],
                library: 'ng2-charts'
            }]
    };

    status: ActionStatus = {label: 'Waiting...', icon: 'radial'};

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
        {value: '0', label: 'Zero', icon: 'close'},
        {value: '1', label: 'One', icon: 'radial'},
    ];

    loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget elit libero. Praesent placerat iaculis urna, ac iaculis ipsum consectetur quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc nec faucibus magna, vel condimentum elit. Mauris auctor purus ut risus mattis, non pharetra sem ornare. Etiam interdum elementum elit, ut vulputate eros vestibulum nec. Fusce sed odio finibus justo mattis aliquam. Curabitur pulvinar, elit sit amet mollis feugiat, augue justo consectetur augue, sed elementum metus orci ac risus. Mauris elementum, tellus malesuada porttitor convallis, ligula ligula pulvinar diam, vitae ornare sapien velit at nulla.';

    @ViewChild('iconAccept') iconAccept: TemplateRef<any>;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngAfterViewInit() {
        this.actions.push(
            {value: 'accept', label: 'Accept', iconTemplate: this.iconAccept},
            {value: 'decline', label: 'Decline', icon: 'close'}
        );
    }
}
