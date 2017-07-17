import { Component, ViewChild, ViewChildren, TemplateRef, QueryList, ContentChild, AfterContentInit } from '@angular/core';
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
export class ComponentsItemDisplayPanelInlineComponent extends BaseDocumentationSection implements IPlunkProvider, AfterContentInit {

    @ViewChild('modalDoc') modalDoc: TemplateRef<any>;
    @ViewChild('modalPpt') modalPpt: TemplateRef<any>;
    @ViewChild('modalPdf') modalPdf: TemplateRef<any>;
  
    visible: boolean = false;
    selectedItem: DisplayPanelItem;
    previousEnabled: boolean = true;
    nextEnabled: boolean = true;
    shadow: boolean = false;

    items: DisplayPanelItem[] = [];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));        
    }

    ngAfterContentInit() {
        let extensions = ['.ppt', '.doc', '.pdf'];
        let titles = ['Site Detail - UX Aspects (PPT)', 'Site Detail - UX Aspects (DOC)', 'Site Detail - UX Aspects (PDF)'];
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