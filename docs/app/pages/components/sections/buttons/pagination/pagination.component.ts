import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-buttons-pagination',
    templateUrl: './pagination.component.html'
})
@DocumentationSectionComponent('ComponentsPaginationComponent')
export class ComponentsPaginationComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Pagination
    public currentPage: number = 1;
    public totalItems: number = 100;
    public itemsPerPage: number = 10;
    public totalPages: number;
    public maxSize: number = 5;
    public previousButton = `<i class="hpe-icon hpe-previous" aria-label="previous page"></i>`;
    public nextButton = `<i class="hpe-icon hpe-next" aria-label="next page"></i>`;

    public plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.examples.appHtml,
            'app.component.ts': this.snippets.examples.appTs
        },
        modules: [{
            library: 'ngx-bootstrap',
            imports: ['PaginationModule'],
            providers: ['PaginationModule.forRoot()']
        }],
        mappings: [MAPPINGS.NgxBootstrap]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}