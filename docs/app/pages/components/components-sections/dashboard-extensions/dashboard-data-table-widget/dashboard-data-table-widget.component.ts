import { Component } from '@angular/core';
import { ColorService, DashboardOptions } from '@ux-aspects/ux-aspects';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-dashboard-data-table-widget',
    templateUrl: './dashboard-data-table-widget.component.html',
    styleUrls: ['./dashboard-data-table-widget.component.less']
})
@DocumentationSectionComponent('ComponentsDashboardDataTableWidgetComponent')
export class ComponentsDashboardDataTableWidgetComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    playground: IPlayground;

    options: DashboardOptions = {
        columns: 2,
        padding: 10,
        rowHeight: 32,
        emptyRow: false,
        minHeight: 32,
        minWidth: 32,
    };

    header: ReadonlyArray<string> = ['1', '2', '3'];

    data: ReadonlyArray<any> = [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
    ];

    text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus venenatis nisi, sed pretium orci ultrices non. Sed malesuada vehicula consectetur. Vestibulum mollis eros odio, sed fringilla urna convallis ut. Suspendisse placerat varius tortor, bibendum bibendum felis porttitor id. Phasellus mi justo, facilisis a quam ac, lobortis semper erat. Pellentesque ornare quam ipsum, vitae gravida sapien laoreet id. Suspendisse aliquam mattis leo, sit amet tempor dolor convallis id. Duis non tempus metus. Morbi vulputate id tortor convallis venenatis. Morbi molestie, sapien fringilla mattis iaculis, nunc enim accumsan tortor, id convallis odio nibh ac justo. Donec ac nisl convallis, aliquam lorem a, scelerisque quam. Curabitur id justo vel sapien scelerisque efficitur. Sed tincidunt varius ex, sed mattis ante tincidunt vitae. Mauris a quam ut urna iaculis porta sed nec turpis.';

    constructor(public colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
