import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/radio-buttons-wrapper.directive';

@Component({
    selector: 'uxd-radio-buttons-ng1',
    templateUrl: './radio-buttons-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsRadioButtonsNg1Component')
export class ComponentsRadioButtonsNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/radio-buttons.html');
    private javascriptCode = require('./snippets/radio-buttons.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'RadioButtonsCtrl as vm'
        },
        js: [this.javascriptCode]
    };
}
