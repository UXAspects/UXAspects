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
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}