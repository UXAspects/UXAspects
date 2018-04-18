import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.less']
})
@DocumentationSectionComponent('ComponentsSidePanelComponent')
export class ComponentsSidePanelComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['SidePanelModule'],
                library: '@ux-aspects/ux-aspects'
            },
        ]
    };

    open = false;
    inline = false;
    width = '50%';
    top = '53px';
    modal = false;
    animate = true;
    closeOnExternalClick = false;

    get attachTo(): string {
        return this._attachTo;
    }

    set attachTo(value: string) {
        this._attachTo = value;
        if (value === 'window') {
            this.top = '53px';
        } else {
            this.top = '0';
        }
    }

    private _attachTo = 'window';
    
    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}