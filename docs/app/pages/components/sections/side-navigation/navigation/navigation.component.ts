import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';


@Component({
    selector: 'uxd-components-side-navigation-navigation',
    templateUrl: './navigation.component.html'
})
@DocumentationSectionComponent('ComponentsNavigationComponent')
export class ComponentsNavigationComponent extends BaseDocumentationSection implements ICodePenProvider {

    private noteCode = require('!!raw-loader!./snippets/ng-class.html');

    public codepen: ICodePen = {
        html: this.snippets.examples.sampleHtml,
        js: [this.snippets.examples.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}