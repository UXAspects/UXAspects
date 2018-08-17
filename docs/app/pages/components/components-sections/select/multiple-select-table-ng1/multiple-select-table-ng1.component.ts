import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-components-multiple-select-table-ng1',
    templateUrl: './multiple-select-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleSelectTableNg1Component')
export class ComponentsMultipleSelectTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codeSnippet: string = '{ id: 1, name: "Eric Carpenter" }';
    selection: MultipleSelectTableItem[] = [];
    query: string = '';
    heading: string = 'Select an author';
    authors: MultipleSelectTableItem[] = this.getRandomNameList(40);

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'MultipleSelectTableCtrl as vm'
        },
        js: [this.snippets.raw.sampleFullJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    getSelectedIds(): string {
        return this.selection.map(elem => elem.id).join(', ');
    }

    clearSelection(): void {
        this.selection = [];
    }

    getRandomNameList(total: number): MultipleSelectTableItem[] {
        const list: MultipleSelectTableItem[] = [];

        for (let idx = 0; idx < total; idx++) {
            list.push({ id: idx + 1, name: chance.name() });
        }

        return list;
    }

}

export interface MultipleSelectTableItem {
    id: number;
    name: string;
}