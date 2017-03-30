import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/draggable-cards-list-view-wrapper.directive';

@Component({
    selector: 'uxd-draggable-cards-list-view-ng1',
    templateUrl: './draggable-cards-list-view-ng1.component.html',
    styleUrls: ['./draggable-cards-list-view-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsDraggableCardsListViewNg1Component')
export class ComponentsDraggableCardsListViewNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/draggable-cards-list-view.html');
    private cssCode = require('./snippets/draggable-cards-list-view.css');
    private javascriptCode = require('./snippets/draggable-cards-list-view.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'DraggableCardsListViewDemoCtrl as vm'
        },
        css: [this.cssCode],
        js: [this.javascriptCode]
    };
}
