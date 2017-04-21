import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-split-button-dropdowns',
    templateUrl: './split-button-dropdowns.component.html'
})
@DocumentationSectionComponent('CssSplitButtonDropdownsComponent')
export class CssSplitButtonDropdownsComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };

    clicked(event: MouseEvent) {
        event.preventDefault();
    }

 }