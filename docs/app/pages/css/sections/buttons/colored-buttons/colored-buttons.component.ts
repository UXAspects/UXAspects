import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-colored-buttons',
    templateUrl: './colored-buttons.component.html'
})
@DocumentationSectionComponent('CssColoredButtonsComponent')
export class CssColoredButtonsComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };

}