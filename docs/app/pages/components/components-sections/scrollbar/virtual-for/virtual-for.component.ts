import { Component } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-virtual-for',
    templateUrl: './virtual-for.component.html',
    styleUrls: ['./virtual-for.component.less']
})
@DocumentationSectionComponent('ComponentsVirtualForComponent')
export class ComponentsVirtualForComponent extends BaseDocumentationSection implements IPlunkProvider {

    employees: Employee[] = [];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['VirtualScrollModule', 'FixedHeaderTableModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 1; idx <= 10000; idx++) {
            this.employees.push({
                id: idx,
                name: chance.name(),
                email: chance.email(),
                department: chance.pickone(['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'])
            });
        }
    }
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}