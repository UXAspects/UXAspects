import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-wizard-validation-ng1',
    templateUrl: './wizard-validation-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsWizardValidationNg1Component')
export class ComponentsWizardValidationNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'WizardValidationCtrl as vm'
        },
        js: [this.jsCode]
    };
    
}