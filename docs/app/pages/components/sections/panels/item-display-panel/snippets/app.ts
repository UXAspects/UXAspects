import { ColorService, ItemDisplayPanelComponent } from 'ux-aspects';
import { Component } from '@angular/core';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    visible: boolean = false;
    title: string = '';
    top: number = 0;
    main: string = '';
    selected: number = 0;
    previousEnabled: boolean = true;
    nextEnabled: boolean = true;
    
    sparkBarColor: string;
    sparkTrackColor: string;

    // templates
    pdf = `<div class="preview-display">
  <h1>Preview PDF</h1>
  <p>Praesent venenatis eros vel felis vehicula dictum. Phasellus augue libero, vulputate euismod purus sed, dictum porta mauris.
    Nunc vitae purus vel velit dapibus porttitor et sagittis mauris. Etiam non semper odio, at ultricies velit. Duis non
    suscipit lectus, vitae fringilla turpis.</p>
</div>`;

    doc = `<div class="preview-display">
  <h1>Preview DOC</h1>
  <p>Donec sagittis augue et pellentesque ultrices. Nulla quis orci sit amet sem ornare auctor. Ut in lobortis turpis. Vivamus
    ante felis, viverra sed ornare ut, ultricies eget ipsum. Vivamus commodo convallis tortor.</p>
</div>`;

    ppt = `<div class="preview-display">
  <h1>Preview PPT</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, nunc sit amet faucibus dapibus, est purus luctus
    magna, ut tempus orci quam vitae diam. Proin dapibus elit et rhoncus interdum. Pellentesque ornare nibh ac nulla sodales
    commodo. Sed vestibulum hendrerit ultrices.</p>
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
            main: this.ppt,
            top: 53
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
            main: this.pdf,
            top: 53
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
            main: this.doc,
            top: 53
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
            main: this.pdf,
            top: 53
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
            main: this.doc,
            top: 53
        }
    }];

    constructor(colorService: ColorService) {
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

    show(panel: ItemDisplayPanelComponent, $event: MouseEvent, id: number) {
        $event.stopPropagation();
        this.selected = id;
        this.updatePanel();
        panel.show();
    }

    previous() {
        this.selected--;
        this.updatePanel();
    }

    next() {
        this.selected++;
        this.updatePanel();
    }

    updatePanel() {
        this.title = this.items[this.selected - 1].panel.title;
        this.top = this.items[this.selected - 1].panel.top;
        this.main = this.items[this.selected - 1].panel.main;
        this.selected = this.items[this.selected - 1].id;

        if (this.selected < 5) {
            this.nextEnabled = true;
        } else {
            this.nextEnabled = false;
        }

        if (this.selected > 1) {
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
    main: string;
    top: number;
}