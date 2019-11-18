import { Component, ViewChild } from '@angular/core';
import { ResizableTableDirective, ResizableExpandingTableDirective } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-column-resizing',
    templateUrl: './column-resizing.component.html',
    styleUrls: ['./column-resizing.component.less']
})
@DocumentationSectionComponent('ComponentsColumnResizingComponent')
export class ComponentsColumnResizingComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    @ViewChild(ResizableTableDirective, { static: false }) resizableTable: ResizableTableDirective;
    @ViewChild(ResizableExpandingTableDirective, { static: false }) resizableTableExpand: ResizableExpandingTableDirective;

    type: string = 'table';
    documents: TableDocument[] = [];
    selection: TableDocument[] = [];

    titleWidth: number = 260;
    authorWidth: number = 300;
    dateWidth: number;
    dateWidthExpand: number = 150;

    playground: IPlayground = {
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
                imports: ['ButtonsModule'],
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

    setToUniform(): void {
        this.resizableTable.setUniformWidths();
    }

    setToUniformExpand(): void {
        this.resizableTableExpand.setUniformWidths();
    }
}

interface TableDocument {
    selected: boolean;
    title: string;
    author: string;
    date: Date;
}