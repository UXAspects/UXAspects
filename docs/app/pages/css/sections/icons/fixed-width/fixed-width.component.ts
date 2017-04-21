import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-icons-fixed-width',
    templateUrl: './fixed-width.component.html'
})
@DocumentationSectionComponent('CssFixedWidthComponent')
export class CssFixedWidthComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };

    clicked(event: MouseEvent) {
        event.preventDefault();
    }

}