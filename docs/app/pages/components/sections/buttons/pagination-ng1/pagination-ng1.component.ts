import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-pagination-ng1',
    templateUrl: './pagination-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsPaginationNg1Component')
export class ComponentsPaginationNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/pagination.html');
    private javascriptCode = require('./snippets/pagination.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'PaginationCtrl as vm'
        },
        js: [this.javascriptCode]
    };
}
