import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-buttons-toggle-buttons',
    templateUrl: './toggle-buttons.component.html'
})
@DocumentationSectionComponent('ComponentsToggleButtonsComponent')
export class ComponentsToggleButtonsComponent extends BaseDocumentationSection implements IPlunkProvider {

    // Toggle model
    public primaryToggleValue: number = 0;
    public accentToggleValue: string = 'off';

    // Check model
    public primaryCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
    public accentCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };

    public plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.examples.toggleHtml + this.snippets.examples.checkHtml,
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