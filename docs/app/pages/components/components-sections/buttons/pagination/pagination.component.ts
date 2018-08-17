import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-buttons-pagination',
    templateUrl: './pagination.component.html'
})
@DocumentationSectionComponent('ComponentsPaginationComponent')
export class ComponentsPaginationComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Pagination
    currentPage: number = 1;
    totalItems: number = 100;
    itemsPerPage: number = 10;
    totalPages: number;
    maxSize: number = 5;
    previousButton = this._sanitizer.bypassSecurityTrustHtml(`<i class="hpe-icon hpe-previous" aria-label="previous page"></i>`);
    nextButton = this._sanitizer.bypassSecurityTrustHtml(`<i class="hpe-icon hpe-next" aria-label="next page"></i>`);

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [{
            library: 'ngx-bootstrap/pagination',
            imports: ['PaginationModule'],
            providers: ['PaginationModule.forRoot()']
        }]
    };

    constructor(private _sanitizer: DomSanitizer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}