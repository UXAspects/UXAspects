import {Component, TemplateRef} from '@angular/core';
import { ColorService, DashboardOptions } from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-dashboard-actions-widget',
    templateUrl: './dashboard-actions-widget.component.html',
    styleUrls: ['./dashboard-actions-widget.component.less']
})
@DocumentationSectionComponent('ComponentsDashboardActionsWidgetComponent')
export class ComponentsDashboardActionsWidgetComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    playground: IPlayground;

    options: DashboardOptions = {
        columns: 2,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    status: { state: string, icon: string | TemplateRef<any> } = { state: 'Waiting...', icon: 'radial' };

    actions: { name: string, icon: string, action: Function }[] = [
        { name: 'Accept', icon: 'active', action: () => alert('accept') },
        { name: 'Decline', icon: 'close', action: () => alert('decline') }
    ];

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
