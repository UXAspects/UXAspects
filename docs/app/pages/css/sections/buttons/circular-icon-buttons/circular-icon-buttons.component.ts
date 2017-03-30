import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-buttons-circular-icon-buttons',
    templateUrl: './circular-icon-buttons.component.html'
})
@DocumentationSectionComponent('CssCircularIconButtonsComponent')
export class CssCircularIconButtonsComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };
}