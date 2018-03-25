import { Component } from '@angular/core';
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

    plunk: IPlunk;

    currentSearchText: string = '';

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    onSearch(searchText: string) {
        this.currentSearchText = searchText;
    }
}
