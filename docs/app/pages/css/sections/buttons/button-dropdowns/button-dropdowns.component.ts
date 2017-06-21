import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-button-dropdowns',
    templateUrl: './button-dropdowns.component.html'
})
@DocumentationSectionComponent('CssButtonDropdownsComponent')
export class CssButtonDropdownsComponent  extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml
    };

    clicked(event: MouseEvent) {
        event.preventDefault();
    }

    constructor() {
        super(require.context('./snippets/', false, /(html|css|js|ts)$/));
    }

}