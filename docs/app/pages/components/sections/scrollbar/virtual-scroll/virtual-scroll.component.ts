import 'chance';
import { BaseDocumentationSection} from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'uxd-components-virtual-scroll',
    templateUrl: './virtual-scroll.component.html',
    styleUrls: ['./virtual-scroll.component.less']
})
@DocumentationSectionComponent('ComponentsVirtualScrollComponent')
export class ComponentsVirtualScrollComponent extends BaseDocumentationSection implements IPlunkProvider {

    loadOnScroll: boolean = true;
    employees: Subject<Employee[]> = new Subject<Employee[]>();

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['VirtualScrollModule', 'CheckboxModule'],
                library: 'ux-aspects'
            },
            {
                imports: ['AccordionModule'],
                library: 'ngx-bootstrap/accordion',
                forRoot: true
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    loadPage(pageNumber: number): void {

        const pageSize = 2000;
        const startIdx = pageNumber * pageSize;
        const endIdx = startIdx + pageSize;
        const employees: Employee[] = [];

        // generate sample employee data
        for (let idx = startIdx; idx < endIdx; idx++) {

            const name = chance.name();

            employees.push({
                id: idx,
                name: name,
                email: name.toLowerCase().replace(' ', '.') + '@business.com',
                department: chance.pickone(DEPARTMENTS)
            });
        }

        // push the next batch of employees to the subject - (delay to simulate server time)
        setTimeout(() => {
            this.employees.next(employees);

            // impose a limit of 10 pages
            if (pageNumber === 10) {
                this.employees.complete();
            }
        }, 1000);
    }
}

interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}