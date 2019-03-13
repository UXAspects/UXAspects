import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-wizard',
    templateUrl: './wizard.component.html'
})
@DocumentationSectionComponent('ComponentsWizardComponent')
export class ComponentsWizardComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    orientation: string = 'horizontal';

    steps: WizardStep[] = [
        {
            header: '1. First Step',
            content: 'Content of step 1.'
        },
        {
            header: '2. Second Step',
            content: 'Content of step 2.'
        },
        {
            header: '3. Third Step',
            content: 'Content of step 3.'
        },
        {
            header: '4. Fourth Step',
            content: 'Content of step 4.'
        }
    ];

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                library: '@ux-aspects/ux-aspects',
                imports: ['RadioButtonModule', 'WizardModule', 'AccordionModule']
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

    onStepChange(index: number): void {
        this._announcer.announce(`${this.steps[index].header} activated`);
    }

}

export interface WizardStep {
    header: string;
    content: string;
}