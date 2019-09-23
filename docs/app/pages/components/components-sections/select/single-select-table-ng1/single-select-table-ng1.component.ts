import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-single-select-table-ng1',
    templateUrl: './single-select-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSingleSelectTableNg1Component')
export class ComponentsSingleSelectTableNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'SingleSelectTableCtrl as vm'
        },
        js: [this.snippets.raw.sampleFullJs]
    });

    selected: Author;
    tableId = 'example-table';
    query: string = '';
    authors: Author[] = [];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 0; idx < 40; idx++) {
            this.authors.push({ id: idx + 1, name: chance.name() });
        }
    }
}

interface Author {
    id: number;
    name: string;
}