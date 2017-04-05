import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-vertical-wizard-ng1',
    templateUrl: './vertical-wizard-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsVerticalWizardNg1Component')
export class ComponentsVerticalWizardNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'VerticalWizardCtrl as vm'
        },
        js: [this.jsCode]
    };
    
}