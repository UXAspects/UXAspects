import { AfterContentInit, Component } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-item-display-panel-inline-component',
    templateUrl: './item-display-panel-inline.component.html',
    styleUrls: ['./item-display-panel-inline.component.less']
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelInlineComponent')
export class ComponentsItemDisplayPanelInlineComponent extends BaseDocumentationSection implements IPlunkProvider, AfterContentInit {

    visible: boolean = false;
    items: DisplayPanelItem[] = [];
    selected: DisplayPanelItem;

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
        const extensions = ['ppt', 'doc', 'pdf'];

        for (let idx = 0; idx < 20; idx++) {

            const extension = chance.pickone(extensions);

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

    selectItem(item: DisplayPanelItem): void {
        // this.shadow = true;
        // this.selectedItem = item;
    }

    togglePanel(): void {
        // this.visible = !this.visible;
    }

    previous(): void {
        // let id = this.selectedItem.id - 1;
        // this.selectedItem = this.items[id - 1];
    }

    next(): void {
        // let id = this.selectedItem.id + 1;
        // this.selectedItem = this.items[id - 1];
    }

    upArrow(event: KeyboardEvent): void {
        // event.preventDefault();
        // this.previous();
    }

    downArrow(event: KeyboardEvent): void {
        // if (this.visible) {
        //     event.preventDefault();
        //     this.next();
        // }
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