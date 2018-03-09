import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-fixed-header-table-ng1',
    templateUrl: './fixed-header-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFixedHeaderTableNg1Component')
export class ComponentsFixedHeaderTableNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    codepen: ICodePen = {
        html: this.snippets.raw.appHtml,
        css: [this.snippets.raw.appCss],
        js: [this.snippets.raw.appJs],
        htmlAttributes: {
            'ng-controller': 'FixedHeaderTableController as vm'
        }
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}