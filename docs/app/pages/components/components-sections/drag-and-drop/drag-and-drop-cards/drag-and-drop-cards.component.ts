import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-drag-and-drop-cards',
    templateUrl: './drag-and-drop-cards.component.html',
    styleUrls: ['./drag-and-drop-cards.component.less']
})
@DocumentationSectionComponent('ComponentsDragAndDropCardsComponent')
export class ComponentsDragAndDropCardsComponent extends BaseDocumentationSection implements AfterViewInit, IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['FocusIfModule', 'ReorderableModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['BsDropdownModule'],
                library: 'ngx-bootstrap/dropdown',
                forRoot: true
            },
            {
                imports: ['ButtonsModule'],
                library: 'ngx-bootstrap/buttons',
                forRoot: true
            },
        ]
    };

    cards: DragAndDropComponent[];

    list: DragAndDropComponent[];

    focus: DragAndDropComponent = null;

    @ViewChild('dropdown')
    dropdownTemplate: TemplateRef<any>;

    @ViewChild('text')
    textTemplate: TemplateRef<any>;

    @ViewChild('buttons')
    buttonsTemplate: TemplateRef<any>;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.cards = [
            {
                name: 'Actions',
                type: 'Dropdown',
                icon: 'hpe-down',
            },
            {
                name: 'Comments',
                type: 'Text',
                icon: 'hpe-document',
            },
            {
                name: 'Direction',
                type: 'Buttons',
                icon: 'hpe-divide',
            }
        ];

        this.list = [];
    }

    ngAfterViewInit(): void {
        this.cards[0].content = this.dropdownTemplate;
        this.cards[1].content = this.textTemplate;
        this.cards[2].content = this.buttonsTemplate;
    }

    moveUp(collection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
        const item = collection[index];
        const target = Math.max(index - 1, 0);
        collection[index] = collection[target];
        collection[target] = item;
        this.focus = item;
        event.preventDefault();

        // ngFor blurs the element when shifting up - we want to retain focus
        setTimeout(() => (<HTMLTableRowElement>event.target).focus());
    }

    moveDown(collection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
        const item = collection[index];
        const target = Math.min(index + 1, collection.length - 1);
        collection[index] = collection[target];
        collection[target] = item;
        this.focus = item;
        event.preventDefault();
    }

    toList(sourceCollection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
        const item = sourceCollection[index];
        this.list.push(item);
        sourceCollection.splice(index, 1);
        this.focus = item;
        event.preventDefault();
    }

    toCard(sourceCollection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
        const item = sourceCollection[index];
        this.cards.push(item);
        sourceCollection.splice(index, 1);
        this.focus = item;
        event.preventDefault();
    }
}

class DragAndDropComponent {
    name: string;
    type: string;
    icon: string;
    content?: TemplateRef<any>;
}