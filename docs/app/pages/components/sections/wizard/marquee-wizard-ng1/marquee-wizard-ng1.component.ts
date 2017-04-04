import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-marquee-wizard-ng1',
    templateUrl: './marquee-wizard-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsMarqueeWizardNg1Component')
export class ComponentsMarqueeWizardNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');
    private cssCode = require('./snippets/sample.css');
    private modalHtml = require('./snippets/modal.html');
    private modalJs = require('./snippets/modal.js');
    private first = require('./snippets/first.html');
    private second = require('./snippets/second.html');
    private third = require('./snippets/third.html');
    private fourth = require('./snippets/fourth.html');

    public codepen: ICodePen = {
        html: this.modalHtml,
        htmlAttributes: {
            'ng-controller': 'MarqueeModalCtrl as vm'
        },
        htmlTemplates: [{
            id: 'sample.html',
            content: this.htmlCode
        }, {
            id: 'first.html',
            content: this.first
        }, {
            id: 'second.html',
            content: this.second
        }, {
            id: 'third.html',
            content: this.third
        }, {
            id: 'fourth.html',
            content: this.fourth
        }],
        css: [this.cssCode],
        js: [this.modalJs, this.jsCode]
    };
    
}