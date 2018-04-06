import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';

@Component({
    selector: 'uxd-components-selection',
    templateUrl: './selection.component.html'
})
@DocumentationSectionComponent('ComponentsSelectionComponent')
export class ComponentsSelectionComponent extends BaseDocumentationSection {

    data: TableData[] = [];
    selection: TableData[] = [];
    mode: string = 'simple';

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 0; idx < 8; idx++) {
            this.data.push({ name: `Document ${idx + 1}`, author: chance.name(), date: chance.date(), selected: false });
        }
    }
}

export interface TableData {
    name: string;
    author: string;
    date: Date;
    selected: boolean;
}