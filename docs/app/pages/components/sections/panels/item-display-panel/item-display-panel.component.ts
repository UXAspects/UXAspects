import { ColorService } from './../../../../../../../src/services/color/color.service';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import 'chance';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { ItemDisplayPanelComponent } from '../../../../../../../src/index';

@Component({
    selector: 'uxd-item-display-panel-component',
    templateUrl: './item-display-panel.component.html'
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelComponent')
export class ComponentsItemDisplayPanelComponent implements IPlunkProvider {

    visible: boolean = false;
    selectedItem: Item;
    previousEnabled: boolean = true;
    nextEnabled: boolean = true;
    
    sparkBarColor: string;
    sparkTrackColor: string;

    htmlCode = require('./snippets/app.html');
    tsCode = require('./snippets/app.ts');
    modalDoc = require('./modalDOC.html');
    modalPdf = require('./modalPDF.html');
    modalPpt = require('./modalPPT.html');

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
            content: this.modalPpt
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
                content: this.modalPdf
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
                content: this.modalDoc
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
                content: this.modalPdf
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
                content: this.modalDoc
            }
        }
    ];

    constructor(colorService: ColorService) {
        this.sparkTrackColor = colorService.getColor('accent').setAlpha(0.2).toRgba();
        this.sparkBarColor = colorService.getColor('accent').toHex();
    }

    show(panel: ItemDisplayPanelComponent, $event: MouseEvent, item: Item) {
        $event.stopPropagation();
        this.selectedItem = item;
        this.updatePanel();
        panel.show();
    }

    previous() {
        let id = this.selectedItem.id - 1;
        this.selectedItem = this.items[id - 1];
        this.updatePanel();
    }

    next() {
        let id = this.selectedItem.id + 1;
        this.selectedItem = this.items[id - 1];
        this.updatePanel();
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

    public plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html')
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