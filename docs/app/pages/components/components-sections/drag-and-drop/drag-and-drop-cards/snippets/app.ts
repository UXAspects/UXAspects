import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {

    cards: DragAndDropComponent[];

    list: DragAndDropComponent[];

    focus: DragAndDropComponent = null;

    @ViewChild('dropdown')
    dropdownTemplate: TemplateRef<any>;

    @ViewChild('text')
    textTemplate: TemplateRef<any>;

    @ViewChild('buttons')
    buttonsTemplate: TemplateRef<any>;

    ngAfterViewInit(): void {
        this.cards = [
            {
                name: 'Actions',
                type: 'Dropdown',
                icon: 'hpe-down',
                content: this.dropdownTemplate
            },
            {
                name: 'Comments',
                type: 'Text',
                icon: 'hpe-document',
                content: this.textTemplate
            },
            {
                name: 'Direction',
                type: 'Buttons',
                icon: 'hpe-divide',
                content: this.buttonsTemplate
            }
        ];

        this.list = [];
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
    content: TemplateRef<any>;
}