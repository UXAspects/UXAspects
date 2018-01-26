import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';


@Component({
    selector: 'uxd-components-side-navigation-navigation-ng1',
    templateUrl: './navigation-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsNavigationNg1Component')
export class ComponentsNavigationNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    noteCode = require('!!raw-loader!./snippets/ng-class.html');

    codepen: ICodePen = {
        html: this.snippets.raw.sampleHtml,
        js: [this.snippets.raw.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}