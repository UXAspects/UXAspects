import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-css-text-inputs-segmented-addons',
    templateUrl: './segmented-addons.component.html'
})
@DocumentationSectionComponent('CssSegmentedAddonsComponent')
export class CssSegmentedAddonsComponent extends BaseDocumentationSection implements ICodePenProvider {

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