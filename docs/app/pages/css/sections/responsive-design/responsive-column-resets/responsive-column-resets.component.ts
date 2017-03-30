import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-responsive-design-responsive-column-resets',
    templateUrl: './responsive-column-resets.component.html'
})
@DocumentationSectionComponent('CssResponsiveColumnResetsComponent')
export class CssResponsiveColumnResetsComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };

}