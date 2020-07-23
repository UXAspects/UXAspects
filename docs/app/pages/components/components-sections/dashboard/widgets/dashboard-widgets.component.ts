import {AfterViewInit, Component, TemplateRef, ViewChild} from '@angular/core';
import { ColorService, DashboardOptions} from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { ActionConfig } from '../../../../../../../src/components/dashboard-widgets/interfaces/actions-widget';
import { EnumConfig } from '../../../../../../../src/components/dashboard-widgets/interfaces/enum-widget';

@Component({
    selector: 'uxd-components-dashboard-widgets',
    templateUrl: './dashboard-widgets.component.html',
    styleUrls: ['./dashboard-widgets.component.less']
})
@DocumentationSectionComponent('ComponentsDashboardWidgetsComponent')
export class ComponentsDashboardWidgetsComponent extends BaseDocumentationSection implements IPlaygroundProvider, AfterViewInit {

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
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

    status: { label: string, icon: string | TemplateRef<any> } = { label: 'Waiting...', icon: 'radial' };

    actions: ActionConfig[] = [];

    tableHeader: ReadonlyArray<string> = ['1', '2', '3'];

    tableData: ReadonlyArray<any> = [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
    ];

    enums: ReadonlyArray<EnumConfig> = [
        { value: 0, label: 'Zero', icon: 'close' },
        { value: 1, label: 'One', icon: 'open' },
    ];

    @ViewChild('iconAccept') iconAccept: TemplateRef<any>;
    @ViewChild('iconDecline') iconDecline: TemplateRef<any>;

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngAfterViewInit() {
        this.actions.push(
            { label: 'Accept', iconTemplate: this.iconAccept, action: () => alert('accept') },
            { label: 'Decline', iconTemplate: this.iconDecline, action: () => alert('decline') }
        );
    }
}
