import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-hotkeys',
    templateUrl: './hotkeys.component.html',
    styleUrls: ['./hotkeys.component.less'],
    host: {
        '(window:keydown.q)': 'focusNextQ()',
        '(window:keydown.w)': 'focusNextW()'
    }
})
@DocumentationSectionComponent('ComponentsHotkeysComponent')
export class ComponentsHotkeysComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    qText: string = 'None';
    wText: string = 'None';
    qFocused: number = null;
    wFocused: number = null;

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['FocusIfModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    constructor(private _liveAnnouncer: LiveAnnouncer) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    announce(item: string): void {
        this._liveAnnouncer.announce(`${item} selected`);
    }

    focusNextQ() {
        this.qFocused = this.qFocused === null || this.qFocused === 3 ? 0 : this.qFocused + 1;
    }

    focusNextW() {
        this.wFocused = this.wFocused === null || this.wFocused === 3 ? 0 : this.wFocused + 1;
    }
}