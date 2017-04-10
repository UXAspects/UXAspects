import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-checkbox-buttons-ng1',
    templateUrl: './checkbox-buttons-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsCheckboxButtonsNg1Component')
export class ComponentsCheckboxButtonsNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/checkbox-buttons.html');
    private javascriptCode = require('./snippets/checkbox-buttons.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'CheckboxButtonsCtrl as vm'
        },
        js: [this.javascriptCode]
    };
}
