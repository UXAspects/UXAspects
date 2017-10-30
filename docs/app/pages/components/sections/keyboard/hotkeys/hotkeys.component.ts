import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';

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
export class ComponentsHotkeysComponent extends BaseDocumentationSection implements IPlunkProvider {

    qText: string = 'None';
    wText: string = 'None';
    qFocused: number = null;
    wFocused: number = null;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
          imports: ['FocusIfModule'],
          library: '@ux-aspects/ux-aspects'
      }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    focusNextQ() {
        this.qFocused = this.qFocused === null || this.qFocused === 3 ? 0 : this.qFocused + 1;
    }

    focusNextW() {
        this.wFocused = this.wFocused === null || this.wFocused === 3 ? 0 : this.wFocused + 1;
    }

}