import { Component } from '@angular/core';
import { ColorService, ItemDisplayPanelComponent } from 'ux-aspects';
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

    visible: boolean = false;
    selectedItem: Item;
    previousEnabled: boolean = true;
    nextEnabled: boolean = true;
    shadow: boolean = false;
    animate: boolean = true;
    inline: boolean = true;
    hideCloseButton: boolean = true;
    preventClose: boolean = true;
    boxShadow: boolean = false;
    
    sparkBarColor: string;
    sparkTrackColor: string;

    // templates
    modalPdf = `<div class="p-r-md p-l-md p-t-sm">
  <h1>Preview PDF</h1>
  <p>Praesent venenatis eros vel felis vehicula dictum. Phasellus augue libero, vulputate euismod purus 
  sed, dictum porta mauris. Nunc vitae purus vel velit dapibus porttitor et sagittis mauris. Etiam non 
  semper odio, at ultricies velit. Duis non suscipit lectus, vitae fringilla turpis.</p>
</div>`;

    modalDoc = `<div class="p-r-md p-l-md p-t-sm">
  <h1>Preview DOC</h1>
  <p>Donec sagittis augue et pellentesque ultrices. Nulla quis orci sit amet sem ornare auctor. Ut in 
  lobortis turpis. Vivamus ante felis, viverra sed ornare ut, ultricies eget ipsum. 
  Vivamus commodo convallis tortor.</p>
</div>`;

    modalPpt = `<div class="p-r-md p-l-md p-t-sm">
  <h1>Preview PPT</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, nunc sit amet faucibus 
  dapibus, est purus luctus magna, ut tempus orci quam vitae diam. Proin dapibus elit et rhoncus 
  interdum. Pellentesque ornare nibh ac nulla sodales commodo. Sed vestibulum hendrerit ultrices.</p>
</div>`;

    items: Item[] = [{
        id: 1,
        name: chance.name(),
        dateString: '10 July 2017',
        document: 'Document 1.ppt',
        extension: '.ppt',
        storage: chance.d100().toString(),
        active: false,
        panel: {
            title: 'Site Detail - UX Aspects (PPT)',
            content: this.modalPpt
        }
        }, {
            id: 2,
            name: chance.name(),
            dateString: '2 July 2017',
            document: 'Document 2.pdf',
            extension: '.pdf',
            storage: chance.d100().toString(),
            active: true,
            panel: {
                title: 'Site Detail - UX Aspects (PDF)',
                content: this.modalPdf
            }
        }, {
            id: 3,
            name: chance.name(),
            dateString: '10 June 2017',
            document: 'Document 3.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 4,
            name: chance.name(),
            dateString: '7 July 2017',
            document: 'Document 4.pdf',
            extension: '.pdf',
            storage: chance.d100().toString(),
            active: true,
            panel: {
                title: 'Site Detail - UX Aspects (PDF)',
                content: this.modalPdf
            }
        }, {
            id: 5,
            name: chance.name(),
            dateString: '12 May 2017',
            document: 'Document 5.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 6,
            name: chance.name(),
            dateString: '11 July 2017',
            document: 'Document 6.doc',
            extension: '.ppt',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PPT)',
                content: this.modalPpt
            }
        }, {
            id: 7,
            name: chance.name(),
            dateString: '6 June 2017',
            document: 'Document 7.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 8,
            name: chance.name(),
            dateString: '1 July 2017',
            document: 'Document 8.ppt',
            extension: '.ppt',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PPT)',
                content: this.modalPpt
            }
        }, {
            id: 9,
            name: chance.name(),
            dateString: '12 July 2017',
            document: 'Document 9.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 10,
            name: chance.name(),
            dateString: '18 June 2017',
            document: 'Document 10.pdf',
            extension: '.pdf',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PDF)',
                content: this.modalPdf
            }
        }, {
            id: 11,
            name: chance.name(),
            dateString: '9 May 2017',
            document: 'Document 11.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 12,
            name: chance.name(),
            dateString: '16 June 2017',
            document: 'Document 12.pdf',
            extension: '.pdf',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PDF)',
                content: this.modalPdf
            }
        }, {
            id: 13,
            name: chance.name(),
            dateString: '11 May 2017',
            document: 'Document 13.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 14,
            name: chance.name(),
            dateString: '10 July 2017',
            document: 'Document 14.ppt',
            extension: '.ppt',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PPT)',
                content: this.modalPpt
            }
        }, {
            id: 15,
            name: chance.name(),
            dateString: '4 July 2017',
            document: 'Document 15.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 16,
            name: chance.name(),
            dateString: '6 July 2017',
            document: 'Document 16.pdf',
            extension: '.pdf',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PDF)',
                content: this.modalPdf
            }
        }, {
            id: 17,
            name: chance.name(),
            dateString: '23 June 2017',
            document: 'Document 17.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 18,
            name: chance.name(),
            dateString: '15 June 2017',
            document: 'Document 18.ppt',
            extension: '.ppt',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PPT)',
                content: this.modalPpt
            }
        }, {
            id: 19,
            name: chance.name(),
            dateString: '10 July 2017',
            document: 'Document 19.doc',
            extension: '.doc',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (DOC)',
                content: this.modalDoc
            }
        }, {
            id: 20,
            name: chance.name(),
            dateString: '3 July 2017',
            document: 'Document 20.pdf',
            extension: '.pdf',
            storage: chance.d100().toString(),
            active: false,
            panel: {
                title: 'Site Detail - UX Aspects (PDF)',
                content: this.modalPdf
            }
        }
    ];

    noSelectedItem = `<div *ngIf="!selectedItem" class="preview-no-record">
    <i class="hpe-icon hpe-document"></i>
    <h2 ng-bind="previewEmptyText" class="ng-binding">Select an item from the list</h2>
</div>`;

    constructor(colorService: ColorService) {
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

    selectItem(item: Item) {
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