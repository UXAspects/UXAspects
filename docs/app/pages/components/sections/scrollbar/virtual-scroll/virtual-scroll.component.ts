import 'chance';
import { BaseDocumentationSection} from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'uxd-components-virtual-scroll',
    templateUrl: './virtual-scroll.component.html',
    styleUrls: ['./virtual-scroll.component.less']
})
@DocumentationSectionComponent('ComponentsVirtualScrollComponent')
export class ComponentsVirtualScrollComponent extends BaseDocumentationSection {

    items: Employee[] = [];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 0; idx < 500; idx++) {

            const name = chance.name();

            this.items.push({
                id: idx,
                name: name,
                email: name.toLowerCase().replace(' ', '.') + '@business.com',
                department: chance.pickone(DEPARTMENTS)
            });
        }
    }


}

interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
}