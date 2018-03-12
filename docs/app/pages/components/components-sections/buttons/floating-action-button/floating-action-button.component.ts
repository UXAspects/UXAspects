import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    styleUrls: ['./floating-action-button.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
                imports: ['FloatingActionButtonsModule', 'RadioButtonModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['TooltipModule'],
                library: 'ngx-bootstrap/tooltip',
                forRoot: true
            },
            {
                imports: ['AccordionModule'],
                library: 'ngx-bootstrap/accordion',
                forRoot: true
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
