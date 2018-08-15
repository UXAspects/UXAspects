import { Component, QueryList, ViewChildren } from '@angular/core';
import { TabbableListItemDirective } from '@ux-aspects/ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    visible: boolean = false;
    selected: DisplayPanelItem;
    items: DisplayPanelItem[] = [];

    get isPreviousEnabled(): boolean {
        return this.items.indexOf(this.selected) > 0;
    }

    get isNextEnabled(): boolean {
        return this.items.indexOf(this.selected) < this.items.length - 1;
    }

    @ViewChildren(TabbableListItemDirective) tabbableItems: QueryList<TabbableListItemDirective>;

    constructor() {
        for (let idx = 1; idx <= 5; idx++) {
            const extension = chance.pickone(['ppt', 'pdf', 'doc']);

            this.items.push({
                author: chance.name(),
                document: `Document ${idx}.${extension}`,
                active: chance.bool(),
                date: chance.date({ year: 2018, string: false }) as Date,
                storage: chance.floating({ min: 10, max: 100, fixed: 2 }),
                panel: {
                    header: `Site Detail - UX Aspects (${extension.toUpperCase()})`,
                    content: chance.paragraph()
                }
            });
        }
    }

    previous(): void {
        if (this.isPreviousEnabled) {
            // determine which item should be selected
            const index = this.items.indexOf(this.selected) - 1;

            // select the target item
            this.selected = this.items[index];

            // make the item focusable
            this.tabbableItems.toArray()[index].focus();
        }
    }

    next(): void {
        if (this.isNextEnabled) {
            // determine which item should be selected
            const index = this.items.indexOf(this.selected) + 1;

            // select the target item
            this.selected = this.items[index];

            // make the item focusable
            this.tabbableItems.toArray()[index].focus();
        }
    }
}

interface DisplayPanelItem {
    author: string;
    date: Date;
    document: string;
    storage: number;
    active: boolean;
    panel: Panel;
}

interface Panel {
    header: string;
    content: string;
}