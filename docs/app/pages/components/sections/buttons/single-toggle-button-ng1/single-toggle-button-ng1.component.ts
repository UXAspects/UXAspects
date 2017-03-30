import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import './wrapper/single-toggle-button-wrapper.directive';

@Component({
    selector: 'uxd-single-toggle-button-ng1',
    templateUrl: './single-toggle-button-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsSingleToggleButtonNg1Component')
export class ComponentsSingleToggleButtonNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/single-toggle-button.html');
    private javascriptCode = require('./snippets/single-toggle-button.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'SingleToggleButtonCtrl as vm'
        },
        js: [this.javascriptCode]
    };
}
