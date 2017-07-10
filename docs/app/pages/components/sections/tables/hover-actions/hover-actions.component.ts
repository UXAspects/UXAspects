import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';

@Component({
    selector: 'uxd-components-hover-actions',
    templateUrl: './hover-actions.component.html',
    styleUrls: ['./hover-actions.component.less']
})
@DocumentationSectionComponent('ComponentsHoverActionsComponent')
export class ComponentsHoverActionsComponent extends BaseDocumentationSection {

    documents: HoverActionDocument[] = [];

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