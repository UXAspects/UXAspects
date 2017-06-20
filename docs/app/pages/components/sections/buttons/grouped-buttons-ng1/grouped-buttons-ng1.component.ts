import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-grouped-buttons-ng1',
    templateUrl: './grouped-buttons-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGroupedButtonsNg1Component')
export class ComponentsGroupedButtonsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.grouptedButtonsTopHtml + '\n' + this.snippets.examples.grouptedButtonsBottomHtml,
        htmlAttributes: {
            'ng-controller': 'GroupedButtonsCtrl as vm'
        },
        js: [this.snippets.examples.groupedButtonsControllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
