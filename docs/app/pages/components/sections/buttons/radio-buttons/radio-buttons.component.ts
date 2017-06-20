import { Component } from '@angular/core';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-buttons-radio-buttons',
    templateUrl: './radio-buttons.component.html'
})
@DocumentationSectionComponent('ComponentsRadioButtonsComponent')
export class ComponentsRadioButtonsComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Radio model
    public primaryRadioValue = 'left';
    public accentRadioValue = 'left';

    public plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.examples.appHtml,
            'app.component.ts': this.snippets.examples.appTs
        },
        modules: [{
            library: 'ngx-bootstrap',
            imports: ['ButtonsModule'],
            providers: ['ButtonsModule.forRoot()']
        }],
        mappings: [MAPPINGS.NgxBootstrap]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}