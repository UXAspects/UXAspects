import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-integrated-date-picker-ng1',
    templateUrl: './integrated-date-picker-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsIntegratedDatePickerNg1Component')
export class ComponentsIntegratedDatePickerNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private sampleJs = require('./snippets/sample.js');

    public codepen: ICodePen = {
        html: this.sampleHtml,
        htmlAttributes: {
            'ng-controller': 'IntegratedDatePickerCtrl as vm'
        },
        js: [this.sampleJs]
    };

}