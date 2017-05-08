import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-buttons-dropdowns',
    templateUrl: './dropdowns.component.html',
    styleUrls: ['./dropdowns.component.less']
})
@DocumentationSectionComponent('ComponentsDropdownsComponent')
export class ComponentsDropdownsComponent extends BaseDocumentationSection implements IPlunkProvider {

    public cases = [
        'Alpha',
        'Beta',
        'Gamma',
        'Delta',
        'Epsilon',
        'Zeta',
        'Eta',
        'Theta',
        'Iota',
        'Kappa',
        'Alpha 2',
        'Alpha 3',
    ];
    public caseFilter = '';

    public plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [{
            library: 'ngx-bootstrap',
            imports: ['BsDropdownModule'],
            providers: ['BsDropdownModule.forRoot()']
        }, {
            imports: ['StringFilterModule'],
            library: 'ux-aspects'
        }],
        mappings: [MAPPINGS.NgxBootstrap]
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