import { Component, ViewChild, ElementRef } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-toolbar-search',
    templateUrl: 'toolbar-search.component.html',
    styleUrls: ['toolbar-search.component.less']
})
@DocumentationSectionComponent('ComponentsToolbarSearchComponent')
export class ComponentsToolbarSearchComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['TooltipModule'],
                library: 'ngx-bootstrap/tooltip',
                forRoot: true
            },
            {
                imports: ['ToolbarSearchModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    expanded: boolean;
    searchText: string;
    searchedFor: string = '';

    @ViewChild('searchFieldRight')
    searchFieldRight: ElementRef;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    onSearch(searchText: string) {
        // Execute search here
        this.searchedFor = searchText;

        // Close the search field if needed
        this.expanded = false;
    }

    onSearchRight(searchText: string) {
        // Execute search here
        this.searchedFor = searchText;
        this.searchFieldRight.nativeElement.blur();
    }
}
