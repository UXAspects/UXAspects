import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-responsive-design-nesting-columns',
    templateUrl: './nesting-columns.component.html'
})
@DocumentationSectionComponent('CssNestingColumnsComponent')
export class CssNestingColumnsComponent implements ICodePenProvider {
    
    private htmlCode = require('./snippets/sample.html');

   public codepen: ICodePen = {
        html: this.htmlCode
    };

}