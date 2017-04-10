import { Component } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-floating-action-button-ng1',
    templateUrl: 'floating-action-button-ng1.component.html',
})
@DocumentationSectionComponent('ComponentsFloatingActionButtonNg1Component')
export class ComponentsFloatingActionButtonNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/floating-action-button.html');
    private javascriptCode = require('./snippets/floating-action-button.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'FloatingActionButtonCtrl as vm'
        },
        js: [this.javascriptCode]
    };
}
