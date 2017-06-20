import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-draggable-cards-list-view-ng1',
    templateUrl: './draggable-cards-list-view-ng1.component.html',
    styleUrls: ['./draggable-cards-list-view-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggableCardsListViewNg1Component')
export class ComponentsDraggableCardsListViewNg1Component extends BaseDocumentationSection implements ICodePenProvider {
    
    public codepen: ICodePen = {
        html: this.snippets.examples.draggableCardsListViewHtml,
        htmlAttributes: {
            'ng-controller': 'DraggableCardsListViewDemoCtrl as vm'
        },
        css: [this.snippets.examples.draggableCardsListViewCss],
        js: [this.snippets.examples.draggableCardsListViewJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
