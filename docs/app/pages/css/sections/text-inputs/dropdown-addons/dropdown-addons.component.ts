import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-text-inputs-dropdown-addons',
    templateUrl: './dropdown-addons.component.html'
})
@DocumentationSectionComponent('CssDropdownAddonsComponent')
export class CssDropdownAddonsComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    
    public codepen: ICodePen = {
        html: this.htmlCode
    };

    clicked(event: MouseEvent) {
        event.preventDefault();
    }

}