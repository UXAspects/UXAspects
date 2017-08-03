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
    primaryToggleValue: number = 0;
    accentToggleValue: string = 'off';

    // Check model
    primaryCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };
    
    accentCheckValue = {
        bold: false,
        italic: true,
        underline: false
    };

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.toggleHtml + this.snippets.raw.checkHtml,
            'app.component.ts': this.snippets.raw.appTs
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