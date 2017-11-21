import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-marquee-wizard-ng1',
    templateUrl: './marquee-wizard-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsMarqueeWizardNg1Component')
export class ComponentsMarqueeWizardNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.modalHtml,
        htmlAttributes: {
            'ng-controller': 'MarqueeModalCtrl as vm'
        },
        htmlTemplates: [{
            id: 'sample.html',
            content: this.snippets.raw.sampleHtml
        }, {
            id: 'first.html',
            content: this.snippets.raw.firstHtml
        }, {
            id: 'second.html',
            content: this.snippets.raw.secondHtml
        }, {
            id: 'third.html',
            content: this.snippets.raw.thirdHtml
        }, {
            id: 'fourth.html',
            content: this.snippets.raw.fourthHtml
        }, {
            id: 'fifth.html',
            content: this.snippets.raw.fifthHtml
        }
        , {
            id: 'sixth.html',
            content: this.snippets.raw.sixthHtml
        }],
        css: [this.snippets.raw.sampleCss],
        js: [this.snippets.raw.modalJs, this.snippets.raw.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
    
}