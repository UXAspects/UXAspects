import { AfterContentInit, Component, TemplateRef, ViewChild } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

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

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['ItemDisplayPanelModule', 'ColorServiceModule', 'SparkModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngAfterContentInit(): void {
        const extensions = ['.ppt', '.doc', '.pdf'];
        const titles = ['Site Detail - UX Aspects (PPT)', 'Site Detail - UX Aspects (DOC)', 'Site Detail - UX Aspects (PDF)'];
        const content = [this.modalPpt, this.modalDoc, this.modalPdf];

        for (let i = 1; i < 10; i++) {
            const idx = chance.integer({ min: 0, max: 2 });

            const item = {
                id: i,
                name: chance.name(),
                dateString: chance.date({ string: true, american: false, year: 2017 }).toString(),
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

    selectItem(item: DisplayPanelItem): void {
        this.shadow = true;
        this.selectedItem = item;
        this.updatePanel();
    }

    togglePanel(): void {
        this.visible = !this.visible;
    }

    previous(): void {
        if (this.previousEnabled) {
            let id = this.selectedItem.id - 1;
            this.selectedItem = this.items[id - 1];
            this.updatePanel();
        }
    }

    next(): void {
        if (this.nextEnabled) {
            let id = this.selectedItem.id + 1;
            this.selectedItem = this.items[id - 1];
            this.updatePanel();
        }
    }

    upArrow(event: KeyboardEvent): void {
        if (this.visible) {
            event.preventDefault();
            this.previous();
        }
    }

    downArrow(event: KeyboardEvent): void {
        if (this.visible) {
            event.preventDefault();
            this.next();
        }
    }

    updatePanel(): void {

        if (this.selectedItem.id < 10) {
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