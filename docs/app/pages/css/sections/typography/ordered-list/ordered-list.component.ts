import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-typography-ordered-list',
    templateUrl: './ordered-list.component.html'
})
@DocumentationSectionComponent('CssOrderedListComponent')
export class CssOrderedListComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };

}