import { Component } from '@angular/core';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-buttons-radio-buttons',
    templateUrl: './radio-buttons.component.html'
})
@DocumentationSectionComponent('ComponentsRadioButtonsComponent')
export class ComponentsRadioButtonsComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Radio model
    primaryRadioValue = 'left';
    accentRadioValue = 'left';

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [{
            library: 'ngx-bootstrap/buttons',
            imports: ['ButtonsModule'],
            providers: ['ButtonsModule.forRoot()']
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}