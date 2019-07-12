import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import 'chance';
import { Subject } from 'rxjs';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'uxd-components-virtual-scroll',
    templateUrl: './virtual-scroll.component.html',
    styleUrls: ['./virtual-scroll.component.less']
})
@DocumentationSectionComponent('ComponentsVirtualScrollComponent')
export class ComponentsVirtualScrollComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    loadOnScroll: boolean = true;
    employees: Subject<Employee[]> = new Subject<Employee[]>();
    loading = false;

    pageSize = 2000;
    totalPages = 10;
    totalItems: number;

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['VirtualScrollModule', 'CheckboxModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    constructor(private _liveAnnouncer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
        this.totalItems = this.pageSize * this.totalPages;
    }

    loadPage(pageNumber: number): void {

        const startIdx = pageNumber * this.pageSize;
        const endIdx = startIdx + this.pageSize;
        const employees: Employee[] = [];

        this.loading = true;
        this._liveAnnouncer.announce('Loading more items, please wait.');

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

            this.loading = false;
            this._liveAnnouncer.announce(`${employees.length} items loaded.`);

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