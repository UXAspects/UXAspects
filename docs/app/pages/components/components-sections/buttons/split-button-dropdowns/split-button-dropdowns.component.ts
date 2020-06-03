import { Component, Inject } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DocumentationType, DOCUMENTATION_TOKEN } from '../../../../../services/playground/tokens/documentation.token';

@Component({
    selector: 'uxd-components-buttons-split-button-dropdowns',
    templateUrl: './split-button-dropdowns.component.html'
})
@DocumentationSectionComponent('ComponentsSplitButtonDropdownsComponent')
export class ComponentsSplitButtonDropdownsComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    playground: IPlayground = {
        files: {
            'app.component.html':
                this._documentationType === DocumentationType.MicroFocus
                    ? this.snippets.raw.appMicrofocusHtml
                    : this.snippets.raw.appKeppelHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [
            {
                library: 'ngx-bootstrap/dropdown',
                imports: ['BsDropdownModule'],
                providers: ['BsDropdownModule.forRoot()']
            },
            {
                imports: ['MenuNavigationModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    toggleIcon = this._documentationType === DocumentationType.MicroFocus ? 'chevron-down' : 'down';

    constructor(@Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.snippets.compiled.appHtml =
            this._documentationType === DocumentationType.MicroFocus
                ? this.snippets.compiled.appMicrofocusHtml
                : this.snippets.compiled.appKeppelHtml;
    }
}
