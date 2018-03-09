import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';


@Component({
    selector: 'uxd-components-side-navigation-navigation-menu-service-ng1',
    templateUrl: './navigation-menu-service-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsNavigationMenuServiceNg1Component')
export class ComponentsNavigationMenuServiceNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.layoutExampleHtml,
        css: [this.snippets.raw.stylesExampleCss],
        js: [this.snippets.raw.controllerJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}