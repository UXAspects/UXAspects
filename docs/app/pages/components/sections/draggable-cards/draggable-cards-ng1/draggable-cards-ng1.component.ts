import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-draggable-cards-ng1',
    templateUrl: './draggable-cards-ng1.component.html',
    styleUrls: ['./draggable-cards-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggableCardsNg1Component')
export class ComponentsDraggableCardsNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    public codepen: ICodePen = {
        html: this.snippets.raw.draggableCardsHtml,
        htmlAttributes: {
            'ng-controller': 'DraggableCardsDemoCtrl as vm'
        },
        css: [this.snippets.raw.draggableCardsCss],
        js: [this.snippets.raw.draggableCardsJs]
    };
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
