import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ItemDisplayPanelComponent } from '@ux-aspects/ux-aspects';
import 'chance';
@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css'],
    host: {
        '(window:keydown.arrowup)': 'upArrow($event)',
        '(window:keydown.arrowdown)': 'downArrow($event)'
    }
})
export class AppComponent {

    @ViewChild('modalDoc') modalDoc: TemplateRef<any>;
    @ViewChild('modalPpt') modalPpt: TemplateRef<any>;
    @ViewChild('modalPdf') modalPdf: TemplateRef<any>;
  
    visible: boolean = false;
    selectedItem: DisplayPanelItem;
    previousEnabled: boolean = true;
    nextEnabled: boolean = true;
    shadow: boolean = false;

    items: DisplayPanelItem[] = [];

    ngAfterContentInit() {
        let extensions = ['.ppt', '.doc', '.pdf'];
        let titles = ['Site Detail - UX Aspects (PPT)', 'Site Detail - UX Aspects (DOC)', 
        'Site Detail - UX Aspects (PDF)'];
        let content = [this.modalPpt, this.modalDoc, this.modalPdf];
        for (let i = 1; i < 21; i++) {
            let idx = chance.integer({min: 0, max: 2});

            let item = {
                id: i,
                name: chance.name(),
                dateString: chance.date({string: true, american: false, year: 2017}).toString(),
                document: 'Document ' + i + extensions[idx],
                extension: extensions[idx],
                storage: chance.d100().toString(),
                active: chance.bool(),
                panel: {
                    title: titles[idx],
                    content: content[idx]
                }
            }; 

            this.items.push(item);
        }
    }

    selectItem(item: DisplayPanelItem) {
        this.shadow = true;
        this.selectedItem = item;
        this.updatePanel();
    }

    togglePanel() {
        this.visible = !this.visible;
    }

    previous() {
        if (this.previousEnabled) {
            let id = this.selectedItem.id - 1;
            this.selectedItem = this.items[id - 1];
            this.updatePanel();
        }
    }

    next() {
        if (this.nextEnabled) {
            let id = this.selectedItem.id + 1;
            this.selectedItem = this.items[id - 1];
            this.updatePanel();
        }
    }

    upArrow(event: KeyboardEvent) {
        if (this.visible) {
            event.preventDefault();
            this.previous();
        }
    }

    downArrow(event: KeyboardEvent) {
        if (this.visible) {
            event.preventDefault();
            this.next();
        }
    }

    updatePanel() {

        if (this.selectedItem.id < 20) {
            this.nextEnabled = true;
        } else {
            this.nextEnabled = false;
        }

        if (this.selectedItem.id > 1) {
            this.previousEnabled = true;
        } else {
            this.previousEnabled = false;
        }
    }
}

interface DisplayPanelItem {
    id: number;
    name: string;
    dateString: string;
    document: string;
    extension: string;
    storage: string;
    active: boolean;
    panel: DisplayPanel;
}

interface DisplayPanel {
    title: string;
    content: TemplateRef<any>;
}