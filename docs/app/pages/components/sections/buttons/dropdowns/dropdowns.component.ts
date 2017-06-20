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
            'app.component.html': this.snippets.examples.appHtml,
            'app.component.css': this.snippets.examples.appCss,
            'app.component.ts': this.snippets.examples.appTs
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
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}