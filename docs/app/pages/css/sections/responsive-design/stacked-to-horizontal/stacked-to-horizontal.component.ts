import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-responsive-design-stacked-to-horizontal',
    templateUrl: './stacked-to-horizontal.component.html'
})
@DocumentationSectionComponent('CssStackedToHorizontalComponent')
export class CssStackedToHorizontalComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    public codepen: ICodePen = {
        html: this.htmlCode
    };
}