import { Component } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-item-display-panel-inline-component',
    templateUrl: './item-display-panel-inline.component.html',
    styleUrls: ['./item-display-panel-inline.component.less']
})
@DocumentationSectionComponent('ComponentsItemDisplayPanelInlineComponent')
export class ComponentsItemDisplayPanelInlineComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    visible: boolean = false;
    items: DisplayPanelItem[] = [];
    selected: DisplayPanelItem;

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['ItemDisplayPanelModule', 'ColorServiceModule', 'SparkModule', 'AccessibilityModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

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