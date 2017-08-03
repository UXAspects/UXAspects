import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';


@Component({
    selector: 'uxd-components-side-navigation-app-navigator',
    templateUrl: './app-navigator.component.html'
})
@DocumentationSectionComponent('ComponentsAppNavigatorComponent')
export class ComponentsAppNavigatorComponent extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.appExampleHtml,
        htmlTemplates: [{
            id: 'app_navigator_popover.tmpl.html',
            content: this.snippets.raw.popoverHtml,
        }],
        css: [this.snippets.raw.sampleCss]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}