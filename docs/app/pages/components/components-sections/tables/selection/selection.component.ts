import { Component } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.less']
})
@DocumentationSectionComponent('ComponentsSelectionComponent')
export class ComponentsSelectionComponent extends BaseDocumentationSection implements IPlunkProvider {

    data: TableData[] = [];
    selection: TableData[] = [];
    mode: string = 'simple';

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['SelectionModule', 'CheckboxModule', 'RadioButtonModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 0; idx < 8; idx++) {
            this.data.push({ name: `Document ${idx + 1}`, author: chance.name(), date: chance.date(), selected: false });
        }
    }
}

export interface TableData {
    name: string;
    author: string;
    date: Date;
    selected: boolean;
}