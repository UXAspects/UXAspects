import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-flippable-cards-ng1',
    templateUrl: './flippable-cards-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFlippableCardsNg1Component')
export class ComponentsFlippableCardsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.examples.appHtml,
        htmlAttributes: {
            'ng-controller': 'FlippableCardCtrl as vm'
        },
        js: [this.snippets.examples.appJs],
        css: [this.snippets.examples.appCss]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}