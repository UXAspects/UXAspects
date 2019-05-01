import { ColorService, ItemDisplayPanelComponent } from '@ux-aspects/ux-aspects';
import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'item-display-panel-app',
    templateUrl: './item-display-panel.testpage.component.html',
    host: {
        '(window:keydown.arrowup)': 'upArrow($event)',
        '(window:keydown.arrowdown)': 'downArrow($event)'
    }
})
export class ItemDisplayPanelTestPageComponent {

    visible: boolean = false;
    selectedItem: Item;
    previousEnabled: boolean = true;
    nextEnabled: boolean = true;
    animate: boolean = false;
    shadow: boolean = true;

    sparkBarColor: string;
    sparkTrackColor: string;

    // templates
    pdf = `<div class="p-r-md p-l-md p-t-sm">
  <h1>Preview PDF</h1>
  <p>Praesent venenatis eros vel felis vehicula dictum. Phasellus augue libero, vulputate euismod purus
  sed, dictum porta mauris. Nunc vitae purus vel velit dapibus porttitor et sagittis mauris. Etiam non
  semper odio, at ultricies velit. Duis non suscipit lectus, vitae fringilla turpis.</p>
</div>`;

    doc = `<div class="p-r-md p-l-md p-t-sm">
  <h1>Preview DOC</h1>
  <p>Donec sagittis augue et pellentesque ultrices. Nulla quis orci sit amet sem ornare auctor. Ut in
  lobortis turpis. Vivamus ante felis, viverra sed ornare ut, ultricies eget ipsum.
  Vivamus commodo convallis tortor.</p>
</div>`;

    ppt = `<div class="p-r-md p-l-md p-t-sm">
  <h1>Preview PPT</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, nunc sit amet faucibus
  dapibus, est purus luctus magna, ut tempus orci quam vitae diam. Proin dapibus elit et rhoncus
  interdum. Pellentesque ornare nibh ac nulla sodales commodo. Sed vestibulum hendrerit ultrices.</p>
</div>`;

    items: Item[] = [{
        id: 1,
        name: chance.name(),
        dateString: '3 Oct 2015',
        document: 'Document 4.ppt',
        extension: '.ppt',
        storage: '95.25',
        active: false,
        panel: {
            title: 'Site Detail - UX Aspects (PPT)',
            content: this.ppt
        }
    }, {
        id: 2,
        name: chance.name(),
        dateString: '3 Oct 2015',
        document: 'Document 9.pdf',
        extension: '.pdf',
        storage: '15.25',
        active: true,
        panel: {
            title: 'Site Detail - UX Aspects (PDF)',
            content: this.pdf
        }
    }, {
        id: 3,
        name: chance.name(),
        dateString: '3 Oct 2015',
        document: 'Document 14.doc',
        extension: '.doc',
        storage: '25.25',
        active: false,
        panel: {
            title: 'Site Detail - UX Aspects (DOC)',
            content: this.doc
        }
    }, {
        id: 4,
        name: chance.name(),
        dateString: '3 Oct 2015',
        document: 'Document 29.pdf',
        extension: '.pdf',
        storage: '15.25',
        active: true,
        panel: {
            title: 'Site Detail - UX Aspects (PDF)',
            content: this.pdf
        }
    }, {
        id: 5,
        name: chance.name(),
        dateString: '3 Oct 2015',
        document: 'Document 34.doc',
        extension: '.doc',
        storage: '15.25',
        active: false,
        panel: {
            title: 'Site Detail - UX Aspects (DOC)',
            content: this.doc
        }
    }];

    constructor(colorService: ColorService) {
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

    show(panel: ItemDisplayPanelComponent, $event: MouseEvent, item: Item) {
        $event.stopPropagation();
        this.selectedItem = item;
        this.updatePanel();
        this.visible = true;
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

        if (this.selectedItem.id < 5) {
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

interface Item {
    id: number;
    name: string;
    dateString: string;
    document: string;
    extension: string;
    storage: string;
    active: boolean;
    panel: Panel;
}

interface Panel {
    title: string;
    content: string;
}
