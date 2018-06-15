import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTabsComponent')
export class ComponentsTabsComponent extends BaseDocumentationSection implements IPlunkProvider {

    tabs: Tab[] = [
        {
            icon: 'hpe-schedule',
            title: 'Schedule',
            content: chance.paragraph()
        },
        {
            icon: 'hpe-shield',
            title: 'Protection',
            content: chance.paragraph()
        },
        {
            icon: 'hpe-information',
            title: 'Solution',
            content: chance.paragraph()
        },
        {
            icon: 'hpe-analytics',
            title: 'Analytics',
            content: chance.paragraph()
        }
    ];

    minimal: boolean = true;
    
    set stacked(stacked: TabStackType) {
        this._stacked = stacked;

        // if the option is left or right we can not have minimal option disabled
        if (stacked === 'left' || stacked === 'right') {
            this.minimal = true;
        }
    }

    get stacked(): TabStackType {
        return this._stacked;
    }

    private _stacked: TabStackType = 'none';

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['TabsetModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                library: 'chance'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}

export type TabStackType = 'left' | 'right' | 'none';

export interface Tab {
    icon: string;
    title: string;
    content: string;
}