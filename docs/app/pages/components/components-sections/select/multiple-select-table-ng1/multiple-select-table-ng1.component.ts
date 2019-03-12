import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-multiple-select-table-ng1',
    templateUrl: './multiple-select-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleSelectTableNg1Component')
export class ComponentsMultipleSelectTableNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    selection: Author[] = [];
    query: string = '';
    authors: Author[] = [];

    codeSnippet: string = '{ id: 1, name: "Eric Carpenter" }';

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'MultipleSelectTableCtrl as vm'
        },
        js: [this.snippets.raw.sampleFullJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 0; idx < 40; idx++) {
            this.authors.push({ id: idx + 1, name: chance.name() });
        }
    }

    getSelection(): string {
        return this.selection.map(author => author.name).join(', ');
    }
}

interface Author {
    id: number;
    name: string;
}