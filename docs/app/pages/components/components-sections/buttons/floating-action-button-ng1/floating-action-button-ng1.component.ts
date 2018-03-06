import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { FloatingActionButtonItem } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-floating-action-button-ng1',
    templateUrl: 'floating-action-button-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFloatingActionButtonNg1Component')
export class ComponentsFloatingActionButtonNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.floatingActionButtonHtml,
        htmlAttributes: {
            'ng-controller': 'FloatingActionButtonCtrl as vm'
        },
        js: [this.snippets.raw.floatingActionButtonJs]
    };

    items: FloatingActionButtonItem[] = [
        {
            icon: 'hpe-add',
            event: () => {}
        },
        {
            icon: 'hpe-analytics',
            event: () => {}
        },
        {
            icon: 'hpe-app',
            event: () => {}
        }
    ];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
