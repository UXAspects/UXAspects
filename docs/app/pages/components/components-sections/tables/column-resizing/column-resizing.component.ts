import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-column-resizing',
    templateUrl: './column-resizing.component.html',
    styleUrls: ['./column-resizing.component.less']
})
@DocumentationSectionComponent('ComponentsColumnResizingComponent')
export class ComponentsColumnResizingComponent extends BaseDocumentationSection {

    documents: TableDocument[] = [];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // generate some dummy data
        for (let idx = 0; idx < 5; idx++) {
            this.documents.push({
                selected: false,
                title: `Document ${idx + 1}`,
                author: chance.name(),
                date: chance.date({ year: new Date().getFullYear() }) as Date
            });
        }
    }
}

interface TableDocument {
    selected: boolean;
    title: string;
    author: string;
    date: Date;
}