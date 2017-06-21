import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-grid-ng1',
    templateUrl: './grid-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGridNg1Component')
export class ComponentsGridNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.appHtml,
        htmlAttributes: {
            'ng-controller': 'GridDemoCtrl as vm'
        },
        js: [this.snippets.examples.appJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}