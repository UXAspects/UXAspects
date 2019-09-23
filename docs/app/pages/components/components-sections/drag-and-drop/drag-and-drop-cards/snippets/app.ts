import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit {

    cards: DragAndDropComponent[];
    list: DragAndDropComponent[];
    focus: DragAndDropComponent = null;
    direction: string;

    @ViewChild('dropdown') dropdownTemplate: TemplateRef<any>;
    @ViewChild('text') textTemplate: TemplateRef<any>;
    @ViewChild('buttons') buttonsTemplate: TemplateRef<any>;

    constructor(private _liveAnnouncer: LiveAnnouncer) {

        this.cards = [
            {
                name: 'Actions',
                type: 'Dropdown',
                icon: 'down',
            },
            {
                name: 'Comments',
                type: 'Text',
                icon: 'document',
            },
            {
                name: 'Direction',
                type: 'Buttons',
                icon: 'divide',
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

        // announce the move
        this._liveAnnouncer.announce('Item moved up.');

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

        // announce the move
        this._liveAnnouncer.announce('Item moved down.');
    }

    toList(sourceCollection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
        const item = sourceCollection[index];
        this.list.push(item);
        sourceCollection.splice(index, 1);
        this.focus = item;
        event.preventDefault();

        // announce the move
        this._liveAnnouncer.announce('Item moved to list.');
    }

    toCard(sourceCollection: DragAndDropComponent[], index: number, event: KeyboardEvent): void {
        const item = sourceCollection[index];
        this.cards.push(item);
        sourceCollection.splice(index, 1);
        this.focus = item;
        event.preventDefault();

        // announce the move
        this._liveAnnouncer.announce('Item moved to cards.');
    }
}

class DragAndDropComponent {
    name: string;
    type: string;
    icon: string;
    content?: TemplateRef<any>;
}