import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-button-dropdowns',
    templateUrl: './button-dropdowns.component.html'
})
@DocumentationSectionComponent('CssButtonDropdownsComponent')
export class CssButtonDropdownsComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };

    clicked(event: MouseEvent) {
        event.preventDefault();
    };

}