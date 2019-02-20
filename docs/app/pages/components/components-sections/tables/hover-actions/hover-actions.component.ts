import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-hover-actions',
    templateUrl: './hover-actions.component.html',
    styleUrls: ['./hover-actions.component.less']
})
@DocumentationSectionComponent('ComponentsHoverActionsComponent')
export class ComponentsHoverActionsComponent extends BaseDocumentationSection implements IPlunkProvider {

    documents: HoverActionDocument[] = [];
    selected: HoverActionDocument[] = [];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                library: 'chance'
            },
            {
                imports: ['HoverActionModule', 'SelectionModule', 'SparkModule', 'TooltipModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 1; idx < 6; idx++) {
            this.documents.push({
                name: `Document ${idx}`,
                author: chance.name(),
                date: chance.date({ year: 2017 }) as Date,
                complete: chance.floating({ min: 0, max: 100, fixed: 2 })
            });
        }
    }
}

interface HoverActionDocument {
    name: string;
    author: string;
    date: Date;
    complete: number;
}