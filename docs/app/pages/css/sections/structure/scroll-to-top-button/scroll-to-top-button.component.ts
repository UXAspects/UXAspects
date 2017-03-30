import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from './../../../../../interfaces/ICodePenProvider';
import { ICodePen } from './../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-css-structure-scroll-to-top-button',
    templateUrl: './scroll-to-top-button.component.html'
})
@DocumentationSectionComponent('CssScrollToTopButtonComponent')
export class CssScrollToTopButtonComponent implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');

    private codepenSnippet = require('./codepen/codepen.html');

    public codepen: ICodePen = {
        html: this.codepenSnippet
    };

}