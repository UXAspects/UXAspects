import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-hierarchy-bar-ng1',
    templateUrl: './hierarchy-bar-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsHierarchyBarNg1Component')
export class ComponentsHierarchyBarNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.appHtml,
        htmlAttributes: {
            'ng-controller': 'HierarchyBarDemoCtrl as vm'
        },
        js: [ this.snippets.examples.appJs ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}