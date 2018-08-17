import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    visible: boolean = false;
    items: DisplayPanelItem[] = [];
    selected: DisplayPanelItem;

    constructor() {
        for (let idx = 0; idx < 20; idx++) {

            const extension = chance.pickone(['ppt', 'doc', 'pdf']);

            const item: DisplayPanelItem = {
                id: idx,
                author: chance.name(),
                date: chance.date({ year: 2018, string: false }) as Date,
                document: `Document ${idx}.${extension}`,
                storage: chance.d100(),
                active: chance.bool(),
                panel: {
                    title: `Site Detail - UX Aspects (${extension.toUpperCase()})`,
                    content: chance.paragraph()
                }
            };

            this.items.push(item);
        }
    }
}

interface DisplayPanelItem {
    id: number;
    document: string;
    author: string;
    date: Date;
    storage: number;
    active: boolean;
    panel: DisplayPanel;
}

interface DisplayPanel {
    title: string;
    content: string;
}