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
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html'),
            'app.component.less': require('./snippets/app.less')
        },
        modules: [{
          imports: ['FocusIfModule'],
          library: 'ux-aspects'
      }]
    };

    constructor() {
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|less|js|ts)$/)
        );
    }

    focusNextQ() {
        this.qFocused = this.qFocused === null || this.qFocused === 3 ? 0 : this.qFocused + 1;
    }

    focusNextW() {
        this.wFocused = this.wFocused === null || this.wFocused === 3 ? 0 : this.wFocused + 1;
    }

}