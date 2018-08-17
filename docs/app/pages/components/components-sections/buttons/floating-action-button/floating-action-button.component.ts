import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    styleUrls: ['./floating-action-button.component.less']
})
@DocumentationSectionComponent('ComponentsFloatingActionButtonComponent')
export class ComponentsFloatingActionButtonComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['FloatingActionButtonsModule', 'RadioButtonModule', 'TooltipModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    direction: string = 'right';

    get placement(): string {
        return this.direction === 'top' || this.direction === 'bottom' ? 'right' : 'top';
    }

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
