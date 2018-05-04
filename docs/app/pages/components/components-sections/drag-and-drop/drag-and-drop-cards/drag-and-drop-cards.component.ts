import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-drag-and-drop-cards',
    templateUrl: './drag-and-drop-cards.component.html',
    styleUrls: ['./drag-and-drop-cards.component.less']
})
@DocumentationSectionComponent('ComponentsDragAndDropCardsComponent')
export class ComponentsDragAndDropCardsComponent extends BaseDocumentationSection {

    cards: DragAndDropComponent[] = [
        {
            name: 'Actions',
            type: 'Dropdown',
            icon: 'hpe-down'
        },
        {
            name: 'Comments',
            type: 'Text',
            icon: 'hpe-document'
        },
        {
            name: 'Direction',
            type: 'Buttons',
            icon: 'hpe-divide'
        }
    ];

    list: DragAndDropComponent[] = [];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

class DragAndDropComponent {
    name: string;
    type: string;
    icon: string;
}