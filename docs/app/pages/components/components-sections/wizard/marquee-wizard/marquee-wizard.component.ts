import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-marquee-wizard',
    templateUrl: './marquee-wizard.component.html',
    styleUrls: ['./marquee-wizard.component.less']
})
@DocumentationSectionComponent('ComponentsMarqueeWizardComponent')
export class ComponentsMarqueeWizardComponent extends BaseDocumentationSection implements IPlunkProvider {

    error: boolean = false;
    skip: boolean = false;
    validate: boolean = false;
    modalOpen: boolean = false;
    requiredText = new FormControl('', Validators.required);
    
    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['ModalModule'],
                forRoot: true,
                library: 'ngx-bootstrap/modal'
            },
            {
                imports: ['MarqueeWizardModule', 'CheckboxModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    /**
     * Close the modal and reset everything
     */
    close(): void {
        this.modalOpen = false;
        this.validate = false;
        this.skip = false;
        this.error = false;
        this.requiredText.reset();
    }
}