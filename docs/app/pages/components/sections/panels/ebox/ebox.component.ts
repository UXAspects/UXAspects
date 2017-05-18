import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-ebox',
    templateUrl: './ebox.component.html'
})
@DocumentationSectionComponent('ComponentsEboxComponent')
export class ComponentsEboxComponent extends BaseDocumentationSection implements IPlunkProvider {
    
    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.compiled.appHtml,
            'app.component.ts': this.snippets.compiled.appTs
        },
        modules: [
            {
                imports: ['EboxModule'],
                library: 'ux-aspects'
            }
        ]
    };

    constructor() {
        super(
            null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
            null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
            null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
            null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
            require.context('./snippets/', false, /\.(html|css|js|ts)$/)
        );
    }
}