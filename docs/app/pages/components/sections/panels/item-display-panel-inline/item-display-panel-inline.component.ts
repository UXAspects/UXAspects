import { ColorService } from './../../../../../../../src/services/color/color.service';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { ItemDisplayPanelComponent } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-item-display-panel-inline-component',
    templateUrl: './item-display-panel-inline.component.html',
    styleUrls: ['./item-display-panel-inline.component.less'],
    host: {
        '(window:keydown.arrowup)': 'upArrow($event)',
        '(window:keydown.arrowdown)': 'downArrow($event)'
    }
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelInlineComponent')
export class ComponentsItemDisplayPanelInlineComponent extends BaseDocumentationSection implements IPlunkProvider {

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

    modalDoc = require('./modalDOC.html');
    modalPdf = require('./modalPDF.html');
    modalPpt = require('./modalPPT.html');

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
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

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

    public plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        mappings: [
            {
                alias: 'chance',
                source: 'npm:chance@1.0.6'
            }
        ],
        modules: [{
            imports: ['ItemDisplayPanelModule', 'ColorServiceModule', 'SparkModule'],
            library: 'ux-aspects'
        }]
    };

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