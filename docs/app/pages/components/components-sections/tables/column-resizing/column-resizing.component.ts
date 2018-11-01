import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-column-resizing',
    templateUrl: './column-resizing.component.html',
    styleUrls: ['./column-resizing.component.less']
})
@DocumentationSectionComponent('ComponentsColumnResizingComponent')
export class ComponentsColumnResizingComponent extends BaseDocumentationSection implements IPlunkProvider {

    type: string = 'table';
    documents: TableDocument[] = [];
    selection: TableDocument[] = [];

    titleWidth: number = 300;
    authorWidth: number = 300;
    dateWidth: number;

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['TableModule', 'CheckboxModule', 'FixedHeaderTableModule', 'SelectionModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: [ 'ButtonsModule' ],
                library: 'ngx-bootstrap/buttons'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // generate some dummy data
        for (let idx = 0; idx < 15; idx++) {
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