import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MarqueeWizardComponent } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-marquee-wizard',
    templateUrl: './marquee-wizard.component.html',
    styleUrls: ['./marquee-wizard.component.less']
})
@DocumentationSectionComponent('ComponentsMarqueeWizardComponent')
export class ComponentsMarqueeWizardComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    error: boolean = false;
    skip: boolean = false;
    validate: boolean = false;
    modalOpen: boolean = false;
    requiredText = new FormControl('', Validators.required);
    resizable: boolean = false;
    sidePanelWidth: number = 25;
    gutterSize: number = 10;

    playground: IPlayground = {
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
                imports: ['MarqueeWizardModule', 'CheckboxModule', 'FocusIfModule', 'IconModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['A11yModule'],
                library: '@angular/cdk/a11y'
            }
        ]
    };

    constructor(private _announcer: LiveAnnouncer) {
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

    onChange(index: number, wizard: MarqueeWizardComponent): void {

        // get the step header
        const step = wizard.steps.toArray()[index];

        // announce the step error
        if (step.valid) {
            this._announcer.announce(`${step.header} activated`);
        } else {
            this._announcer.announce(`${step.header} activated. This step is invalid.`);
        }
    }

    onError(): void {
        this._announcer.announce(`The current step is invalid`);
    }
}