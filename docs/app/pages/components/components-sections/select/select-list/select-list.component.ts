import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.less']
})
@DocumentationSectionComponent('ComponentsSelectListComponent')
export class ComponentsSelectListComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    multiple: boolean = false;
    selected: ReadonlyArray<string> = [];
    authors: string[] = [];
    query: string = '';

    private _authors: string[] = [];

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['SelectListModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // create some dummy list items
        for (let idx = 0; idx < 20; idx++) {
            this._authors.push(chance.name());
        }

        // perform initial search
        this.search();
    }

    search(): void {
        this.authors = this._authors.filter(author => author.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }

}