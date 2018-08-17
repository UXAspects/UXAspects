import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-components-single-select-table-ng1',
    templateUrl: './single-select-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSingleSelectTableNg1Component')
export class ComponentsSingleSelectTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    selection: SingleSelectTableItem;
    tableId: string = 'example-table';
    query: string = '';
    authors: SingleSelectTableItem[] = this.getRandomNameList(40);

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'SingleSelectTableCtrl as vm'
        },
        js: [this.snippets.raw.sampleFullJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    getRandomNameList(total: number): SingleSelectTableItem[] {
        const list: SingleSelectTableItem[] = [];

        for (let idx = 0; idx < total; idx++) {
            list.push({ id: idx + 1, name: chance.name() });
        }
        return list;
    }
}

export interface SingleSelectTableItem {
    id: number;
    name: string;
}