import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-wizard-ng1',
    templateUrl: './wizard-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsWizardNg1Component')
export class ComponentsWizardNg1Component implements ICodePenProvider {

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