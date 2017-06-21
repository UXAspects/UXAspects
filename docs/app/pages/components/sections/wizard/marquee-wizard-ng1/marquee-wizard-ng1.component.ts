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

    // private htmlCode = require('./snippets/sample.html');
    // private jsCode = require('./snippets/sample.js');
    // private cssCode = require('./snippets/sample.css');
    // private modalHtml = require('./snippets/modal.html');
    // private modalJs = require('./snippets/modal.js');
    // private first = require('./snippets/first.html');
    // private second = require('./snippets/second.html');
    // private third = require('./snippets/third.html');
    // private fourth = require('./snippets/fourth.html');
    // private fifth = require('./snippets/fifth.html');
    // private sixth = require('./snippets/sixth.html');

    public codepen: ICodePen = {
        html: this.snippets.examples.modalHtml,
        htmlAttributes: {
            'ng-controller': 'MarqueeModalCtrl as vm'
        },
        htmlTemplates: [{
            id: 'sample.html',
            content: this.snippets.examples.sampleHtml
        }, {
            id: 'first.html',
            content: this.snippets.examples.firstHtml
        }, {
            id: 'second.html',
            content: this.snippets.examples.secondHtml
        }, {
            id: 'third.html',
            content: this.snippets.examples.thirdHtml
        }, {
            id: 'fourth.html',
            content: this.snippets.examples.fourthHtml
        }, {
            id: 'fifth.html',
            content: this.snippets.examples.fifthHtml
        }
        , {
            id: 'sixth.html',
            content: this.snippets.examples.sixthHtml
        }],
        css: [this.snippets.examples.sampleCss],
        js: [this.snippets.examples.modalJs, this.snippets.examples.sampleJs]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
    
}