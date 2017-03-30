import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-icons-icon-size',
    templateUrl: './icon-size.component.html'
})
@DocumentationSectionComponent('CssIconSizeComponent')
export class CssIconSizeComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };
}