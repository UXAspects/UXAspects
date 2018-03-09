import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-component-list-ng1',
    templateUrl: './component-list-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsComponentListNg1Component')
export class ComponentsComponentListNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.componentListHtml,
        htmlAttributes: {
            'ng-controller': 'ComponentListDemoCtrl as vm'
        },
        js: [this.snippets.raw.componentListJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
