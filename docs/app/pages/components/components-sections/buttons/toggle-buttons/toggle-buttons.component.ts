import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-buttons-toggle-buttons',
    templateUrl: './toggle-buttons.component.html'
})
@DocumentationSectionComponent('ComponentsToggleButtonsComponent')
export class ComponentsToggleButtonsComponent extends BaseDocumentationSection implements IPlaygroundProvider {

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

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.toggleHtml + this.snippets.raw.checkHtml,
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