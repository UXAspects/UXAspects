import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-draggable-cards-ng1',
    templateUrl: './draggable-cards-ng1.component.html',
    styleUrls: ['./draggable-cards-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggableCardsNg1Component')
export class ComponentsDraggableCardsNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/draggable-cards.html');
    private cssCode = require('./snippets/draggable-cards.css');
    private javascriptCode = require('./snippets/draggable-cards.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'DraggableCardsDemoCtrl as vm'
        },
        css: [this.cssCode],
        js: [this.javascriptCode]
    };
}
