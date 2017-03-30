import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-typography-unordered-list',
    templateUrl: './unordered-list.component.html'
})
@DocumentationSectionComponent('CssUnorderedListComponent')
export class CssUnorderedListComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };

}