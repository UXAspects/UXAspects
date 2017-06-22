import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-dropdown-ng1',
    templateUrl: './dropdown-ng1.component.html',
    styleUrls: ['./dropdown-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDropdownNg1Component')
export class ComponentsDropdownNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.raw.dropdownHtml + '\n' + this.snippets.raw.dropdownMenuHtml,
        htmlAttributes: {
            'ng-controller': 'DropdownCtrl as vm'
        },
        css: [this.snippets.raw.dropdownCss],
        js: [this.snippets.raw.dropdownJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
